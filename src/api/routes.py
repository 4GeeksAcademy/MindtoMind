"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Psychologist,TokenBlockedList
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import openai
import requests
# Allow CORS requests to this API

load_dotenv()

client = OpenAI(
    api_key=os.getenv("API_KEY_AI")
    
)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://sturdy-space-memory-7v74r7vxgg9gfpj45-3000.app.github.dev"}})
api = Blueprint('api', __name__)
CORS(api, resources={r"/*": {"origins": "https://sturdy-space-memory-7v74r7vxgg9gfpj45-3000.app.github.dev"}})
# Obtener todos los usuarios
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


    
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


def get_openai_response(messages):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {os.getenv('API_KEY_AI')}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "temperature": 0.7
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.text}

def is_inappropriate(content):
    # Aquí definís el listado de palabras no apropiadas
    inappropriate_keywords = ["porno","matar","sexo","suicidio","pastillas","medicamentos"]
    return any(keyword in content.lower() for keyword in inappropriate_keywords)


@api.route('/demo', methods=['POST'])
def handleIA():
    if request.method == 'POST':
        data = request.get_json()
        content = data.get('content')

        if content == "exit":
            return jsonify({"message": "Conversación terminada."}), 200

        messages = [
            {"role": "system", "content": "Solo temas psicológicos. No hablar de medicamentos. No pasar a otras páginas web. No hacer evaluaciones negativas. Mantener una rutina diaria para estructura y normalidad. Hacer actividad física para mejorar el estado de ánimo. Abordar el sueño inadecuado que puede contribuir a la depresión. Enfocar en objetivos pequeños para sentir menos agobio. Practicar técnicas de manejo del estrés como meditación, yoga y respiración profunda. Hacer cosas que te gustan para recuperar interés y placer en la vida. Escuchar sin juicios y sin diagnosticar. Animar a retomar actividades que antes reconfortaban, sin presionar. Ofrecer apoyo y aliento, sugiriendo hablar con un experto si es útil. No hablar con terceros del problema delante de la persona afectada. Recordar que estás disponible para ayudar y ofrecer apoyo continuo."},
            {"role": "user", "content": content},
            
        ]
        
        try:
            response = get_openai_response(messages)
            
            if "error" in response:
                return jsonify({"error": response["error"]}), 500

            result = response['choices'][0]['message']['content']
            if is_inappropriate(result):
                return jsonify({"message": "Hay muchos profesionales capacitados que pueden ayudarte a manejar esto. Si quieres, puedo ayudarte a buscar opciones."}), 400
            
            response_body = {
                "message": result
            }
            return jsonify(response_body), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Por favor, envíe una solicitud POST con su contenido."}), 200


if __name__ == '__main__':
    app.run(debug=True)
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
