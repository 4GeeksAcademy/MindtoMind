"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Psychologist
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Crear usuario
@api.route('/users', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

# Obtener todos los usuarios
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

# Obtener un usuario por ID
@api.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.serialize()), 200

# Crear psicólogo
@api.route('/psychologists', methods=['POST'])
def create_psychologist():
    data = request.json
    new_psychologist = Psychologist(
        first_name=data['first_name'], last_name=data['last_name'],
        phone_number=data['phone_number'], email=data['email'],
        password=data['password'], specialty=data['specialty'],
        years_of_experience=data['years_of_experience'], photo=data.get('photo')
    )
    db.session.add(new_psychologist)
    db.session.commit()
    return jsonify(new_psychologist.serialize()), 201

# Obtener todos los psicólogos
@api.route('/psychologists', methods=['GET'])
def get_psychologists():
    psychologists = Psychologist.query.all()
    return jsonify([psychologist.serialize() for psychologist in psychologists]), 200

# Obtener un psicólogo por ID
@api.route('/psychologist/<int:id>', methods=['GET'])
def get_psychologist(id):
    psychologist = Psychologist.query.get_or_404(id)
    return jsonify(psychologist.serialize()), 200
