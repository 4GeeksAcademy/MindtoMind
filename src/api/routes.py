"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Psychologist,TokenBlockedList
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

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


# Eliminar un usuario por ID
@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200



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


# Eliminar un psicólogo por ID
@api.route('/psychologist/<int:id>', methods=['DELETE'])
def delete_psychologist(id):
    psychologist = Psychologist.query.get_or_404(id)
    db.session.delete(psychologist)
    db.session.commit()
    return jsonify({"message": "Psychologist deleted successfully"}), 200




# Ruta para el registro de usuarios
@api.route('/register', methods=['POST'])
def register():
    data = request.json
    new_user = User(username=data['username'], email=data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(new_user.serialize()), 201


# Ruta para el registro de psicólogos
@api.route('/register_psychologist', methods=['POST'])
def register_psychologist():
    data = request.json
    new_psychologist = Psychologist(
        first_name=data['first_name'], last_name=data['last_name'],
        phone_number=data['phone_number'], email=data['email'],
        specialty=data['specialty'], years_of_experience=data['years_of_experience'],
        photo=data.get('photo')
    )
    new_psychologist.set_password(data['password'])
    db.session.add(new_psychologist)
    db.session.commit()
    return jsonify(new_psychologist.serialize()), 201


# Ruta para el inicio de sesión de usuarios
@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401


# Ruta para el inicio de sesión de psicólogos
@api.route('/login_psychologist', methods=['POST'])
def login_psychologist():
    data = request.json
    psychologist = Psychologist.query.filter_by(email=data['email']).first()
    if psychologist and psychologist.check_password(data['password']):
        access_token = create_access_token(identity=psychologist.id)
        return jsonify({'token': access_token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401


@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    jti=get_jwt()["jti"]
    token_blocked=TokenBlockedList(jti=jti)
    db.session.add(token_blocked) 
    db.session.commit()
    return jsonify({"msg":"Sesion cerrada"})





# Ruta protegida de ejemplo
@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({'message': f'Hello, {user.username}'}), 200
