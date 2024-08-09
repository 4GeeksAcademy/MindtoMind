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

if __name__ == '__main__':
    app.run(debug=True)


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


# Obtener todos los usuarios
@api.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        if not users:
            return jsonify({"message": "No users found"}), 404
        
        return jsonify({
            "message": "Users retrieved successfully",
            "data":[user.serialize() for user in users]
            }), 200
    
    except Exception as e:
        print(f"Error retrieving users: {str(e)}")
        
        return jsonify({
            "message": "An error occurred while retrieving users",
            "error": str(e)
        }), 500


# Obtener un usuario por ID
@api.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    try:
        user = User.query.get(id)
        
        if user is None:
            return jsonify({"message": "User not found"}), 404

        return jsonify({
            "message": "User retrieved successfully",
            "data": user.serialize()
            }), 200
    
    except Exception as e:
        # Imprimir el error en la consola para depuración
        print(f"Error retrieving user with id {id}: {str(e)}")

    return jsonify({
            "message": "An error occurred while retrieving the user",
            "error": str(e)
        }), 500


# Eliminar un usuario por ID
@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.get(id)

        if user is None:
                return jsonify({"message": "User not found"}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "User deleted successfully"}), 200
    
    except Exception as e:
        return jsonify({
            "message": "An error occurred while deleting the user",
            "error": str(e)
        }), 500


# Obtener todos los psicólogos
@api.route('/psychologists', methods=['GET'])
def get_psychologists():
    try:
        psychologists = Psychologist.query.all()
        
        if not psychologists:
            return jsonify({"message": "No psychologists found"}), 404

        return jsonify({
            "message": "Users retrieved successfully",
            "data":[psychologist.serialize() for psychologist in psychologists]}
            ), 200
    
    except Exception as e:
        print(f"Error retrieving psychologists: {str(e)}")

        return jsonify({
            "message": "An error occurred while retrieving psychologists",
            "error": str(e)
        }), 500


# Obtener un psicólogo por ID
@api.route('/psychologist/<int:id>', methods=['GET'])
def get_psychologist(id):
    try:
        psychologist = Psychologist.query.get(id)

        if psychologist is None:
            return jsonify({"message": "Psychologist not found"}), 404

        return jsonify({
            "message": "psychologist retrieved successfully",
            "data": psychologist.serialize()}), 200
    
    except Exception as e:
        return jsonify({
            "message": "An error occurred while retrieving the psychologist",
            "error": str(e)
        }), 500


# Eliminar un psicólogo por ID
@api.route('/psychologist/<int:id>', methods=['DELETE'])
def delete_psychologist(id):
    try:
        psychologist = Psychologist.query.get(id)

        if psychologist is None:
            return jsonify({"message": "Psychologist not found"}), 404

        db.session.delete(psychologist)
        db.session.commit()

        return jsonify({"message": "Psychologist deleted successfully"}), 200
    
    except Exception as e:
        return jsonify({
            "message": "An error occurred while deleting the psychologist",
            "error": str(e)
        }), 500


# Ruta para el registro de usuarios
@api.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        new_user = User(username=data['username'], email=data['email'])
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            "messege":"User created successfully"
            }), 200 #new_user.serialize()
    
    except KeyError as e:
        return jsonify({
            "message": "Missing required data",
            "error": str(e)
        }), 400
    
    except Exception as e:
        return jsonify({
            "message": "An error occurred while registering the user",
            "error": str(e)
        }), 500


# Ruta para el registro de psicólogos
@api.route('/register_psychologist', methods=['POST'])
def register_psychologist():
    try:
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

        return jsonify({
            "messege":"Psychologist created successfully",
            }), 200 #new_psychologist.serialize()
    
    except KeyError as e:
        return jsonify({
            "message": "Missing required data",
            "error": str(e)
        }), 400
    
    except Exception as e:
        return jsonify({
            "message": "An error occurred while registering the psychologist",
            "error": str(e)
        }), 500


# Ruta para el inicio de sesión de usuarios
@api.route('/login', methods=['POST'])
def login():
    try:

        data = request.json
        user = User.query.filter_by(email=data['email']).first()

        if user and user.check_password(data['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify({'token': access_token}), 200
        
        return jsonify({'message': 'Invalid credentials'}), 401

    except Exception as e:
        return jsonify({
            "message": "An error occurred during login",
            "error": str(e)
        }), 500


# Ruta para el inicio de sesión de psicólogos
@api.route('/login_psychologist', methods=['POST'])
def login_psychologist():
    try:
        data = request.json
        psychologist = Psychologist.query.filter_by(email=data['email']).first()

        if psychologist and psychologist.check_password(data['password']):
            access_token = create_access_token(identity=psychologist.id)
            return jsonify({'token': access_token}), 200
        
        return jsonify({'message': 'Invalid credentials'}), 401
    
    except Exception as e:
        return jsonify({
            "message": "An error occurred during psychologist login",
            "error": str(e)
        }), 500


@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    try:
        jti=get_jwt()["jti"]
        token_blocked=TokenBlockedList(jti=jti)
        db.session.add(token_blocked) 
        db.session.commit()
        
        return jsonify({"msg":"Session closed"}), 200
    
    except Exception as e:
        return jsonify({
            "message": "An error occurred while logging out",
            "error": str(e)
        }), 500


# Ruta protegida de ejemplo
# @api.route('/protected', methods=['GET'])
# @jwt_required()
# def protected():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)
#     return jsonify({'message': f'Hello, {user.username}'}), 200
