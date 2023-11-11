from flask import Blueprint, render_template, redirect, url_for, flash
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request

from app import db
from app.models import User
from app.auth_forms import RegistrationForm, LoginForm

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    # ... (rest of the code)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    # ... (rest of the code)

@auth_bp.route('/logout')
@login_required
def logout():
    # ... (rest of the code)


