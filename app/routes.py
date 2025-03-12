from flask import Blueprint, render_template

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return render_template("index.html")

@main.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@main.route("/expenses")
def expenses():
    return render_template("expenses.html")

@main.route("/business")
def business():
    return render_template("business.html")

