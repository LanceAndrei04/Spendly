from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__, static_url_path='', static_folder='.')
CORS(app)

# Initialize SQLite database
def init_db():
    with sqlite3.connect('spendly.db') as conn:
        cursor = conn.cursor()
        
        # Create users table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
        ''')
        
        # Create budgets table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS budgets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            amount REAL NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
        ''')
        
        # Create expenses table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
        ''')
        
        conn.commit()
        print("Database initialized successfully!")

# Initialize database on startup
init_db()

# Serve static files
@app.route('/')
def root():
    return app.send_static_file('index.html')

# User routes
@app.route('/api/users/register', methods=['POST'])
def register():
    data = request.json
    print(f"Register request: {data}")
    try:
        with sqlite3.connect('spendly.db') as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                         (data['name'], data['email'], data['password']))
            user_id = cursor.lastrowid
            conn.commit()
            print(f"User registered with ID: {user_id}")
            return jsonify({'id': user_id, 'name': data['name'], 'email': data['email']}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 400

@app.route('/api/users/login', methods=['POST'])
def login():
    data = request.json
    print(f"Login request: {data}")
    with sqlite3.connect('spendly.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, email FROM users WHERE email = ? AND password = ?',
                      (data['email'], data['password']))
        user = cursor.fetchone()
        if user:
            print(f"User logged in with ID: {user[0]}")
            return jsonify({'id': user[0], 'name': user[1], 'email': user[2]}), 200
        return jsonify({'error': 'Invalid credentials'}), 401

# Budget routes
@app.route('/api/budget/<int:user_id>', methods=['GET', 'POST'])
def budget(user_id):
    if request.method == 'POST':
        data = request.json
        print(f"Setting budget for user {user_id}: {data}")
        with sqlite3.connect('spendly.db') as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM budgets WHERE user_id = ?', (user_id,))
            cursor.execute('INSERT INTO budgets (user_id, amount) VALUES (?, ?)',
                         (user_id, data['amount']))
            conn.commit()
            print(f"Budget updated for user {user_id}")
            return jsonify({'message': 'Budget updated'}), 200
    else:
        print(f"Getting budget for user {user_id}")
        with sqlite3.connect('spendly.db') as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT amount FROM budgets WHERE user_id = ?', (user_id,))
            budget = cursor.fetchone()
            amount = budget[0] if budget else 0
            print(f"Budget for user {user_id}: {amount}")
            return jsonify({'amount': amount}), 200

# Expense routes
@app.route('/api/expenses/<int:user_id>', methods=['GET', 'POST'])
def expenses(user_id):
    if request.method == 'POST':
        data = request.json
        print(f"Adding expense for user {user_id}: {data}")
        with sqlite3.connect('spendly.db') as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO expenses (user_id, description, amount, category, date)
                VALUES (?, ?, ?, ?, ?)
            ''', (user_id, data['description'], data['amount'], data['category'], data['date']))
            expense_id = cursor.lastrowid
            conn.commit()
            print(f"Expense added for user {user_id}, ID: {expense_id}")
            return jsonify({'id': expense_id}), 201
    else:
        print(f"Getting expenses for user {user_id}")
        with sqlite3.connect('spendly.db') as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT id, description, amount, category, date
                FROM expenses
                WHERE user_id = ?
                ORDER BY date DESC
            ''', (user_id,))
            expenses = cursor.fetchall()
            result = [{
                'id': e[0],
                'description': e[1],
                'amount': e[2],
                'category': e[3],
                'date': e[4]
            } for e in expenses]
            print(f"Found {len(result)} expenses for user {user_id}")
            return jsonify(result), 200

@app.route('/api/expenses/<int:user_id>/<int:expense_id>', methods=['DELETE'])
def delete_expense(user_id, expense_id):
    print(f"Deleting expense {expense_id} for user {user_id}")
    with sqlite3.connect('spendly.db') as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM expenses WHERE id = ? AND user_id = ?',
                      (expense_id, user_id))
        conn.commit()
        print(f"Expense {expense_id} deleted for user {user_id}")
        return jsonify({'message': 'Expense deleted'}), 200

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(port=5000, debug=True)
