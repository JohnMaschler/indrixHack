from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Change this to a secure key
db = SQLAlchemy(app)

from app import auth  # Import after initializing db to avoid circular import issues

if __name__ == '__main__':
    app.run(debug=True)