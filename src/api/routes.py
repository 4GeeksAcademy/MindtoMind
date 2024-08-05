"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, get_jwt, jwt_required
from api.models import db, User, TokenBlockedList, Psicologo
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup/user', methods=['POST'])
def user_signup():
    body=request.get_json()
    if "email" not in body:
        return jsonify({"msg":"El campo email es requerido"}), 400
    if "password" not in body:
        return jsonify({"msg":"El campo password es requerido"}), 400
    
    encrypted_password=bcrypt.generate_password_hash(body["password"]).decode('utf-8') 
    
    new_user = User(email=body["email"],  
                    password=encrypted_password, is_active=True)

    if "first_name" in body:
        new_user.first_name = body["first_name"]
    else:
        new_user.first_name = ""

    if "last_name" in body:
        new_user.last_name = body["last_name"]
    else:
        new_user.last_name = ""

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg":"ok"})

@api.route('/signup/psico', methods=['POST'])
def user_signup_psico():
    body=request.get_json()
    if "email" not in body:
        return jsonify({"msg":"El campo email es requerido"}), 400
    if "password" not in body:
        return jsonify({"msg":"El campo password es requerido"}), 400
    if "role" not in body:
        return jsonify({"msg": "El Campo role es requerido"}), 400
    
    encrypted_password=bcrypt.generate_password_hash(body["password"]).decode('utf-8') 
    
    new_psico = Psicologo(email=body["email"], role=body["role"],  
                    password=encrypted_password, is_active=True)

    if "first_name" in body:
        new_psico.first_name = body["first_name"]
    else:
        new_psico.first_name = ""

    if "last_name" in body:
        new_psico.last_name = body["last_name"]
    else:
        new_psico.last_name = ""
    
    if "role" in body:
        new_psico.role = body["role"]
    else:
        new_psico.role = ""

    db.session.add(new_psico)
    db.session.commit()

    return jsonify({"msg":"ok"})

@api.route('/login', methods=['POST'])
def user_login():
    body=request.get_json()
    #1. Valido los campos del body de la petición 
    if "email" not in body:
        return jsonify({"msg":"El campo email es requerido"}), 400
    if "password" not in body:
        return jsonify({"msg":"El campo password es requerido"}), 400
    
    #2. Busco al usuario en la base de datos con el correo 
    user=User.query.filter_by(email=body["email"]).first()

    #2.1 si el usuario no aparece retorna un error 404
    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    #3. verifico el campo password del body con el password del usuario en la base de datos 
    password_checked=bcrypt.check_password_hash(user.password,body["password"])

    #3.1 si no se verifica se retorna un error de clave invalidad se retorna un error 401
    if password_checked == False:
        return jsonify({"msg": "Clave invalida"}), 401
    
    #4. Generar el token
    
    token = create_access_token(identity=user.id, additional_claims={"role": role})
    return jsonify({"token":token}), 200

@api.route('/logout', methods=['POST'] )
@jwt_required() 
def user_logout():
    jti=get_jwt()["jti"]
    token_blocked=TokenBlockedList(jti=jti)
    db.session.add(token_blocked)
    db.session.commit()
    return jsonify({"msg": "Sesión Cerrada"})


@api.route("/userinfo", methods=['GET'])
@jwt_required() 
def user_info():
    user=get_jwt_identity()
    payload=get_jwt()
    return jsonify({"user":user,"role":payload["role"]})