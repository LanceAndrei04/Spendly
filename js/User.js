class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static fromJSON(data) {
        return new User(data.id, data.name, data.email);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    }

    isValid() {
        return this.id && this.name && this.email;
    }

    static getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? User.fromJSON(JSON.parse(userData)) : null;
    }

    static setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    static clearCurrentUser() {
        localStorage.removeItem('currentUser');
    }
}