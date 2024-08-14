"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Psychologist,TokenBlockedList
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt,decode_token
import jwt
import datetime
from api.models import db, User,Psychologist,TokenBlockedList, Conversation, Message
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import openai
import requests
import cloudinary
import cloudinary.uploader
import cloudinary.api
import json
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

#JWT secret
app.config['SECRET_KEY'] =  os.getenv("JWT_SECRET")

SECRET_KEY = 'SECRET_KEY'

# Configuración de Cloudinary
cloudinary.config( 
  cloud_name = os.getenv("CLOUD_NAME"), 
  api_key = os.getenv("API_KEY"), 
  api_secret = os.getenv("API_SECRET"),
  secure = True
)

conversation_file = 'conversation_history.json'

def save_conversation(history):
    with open(conversation_file, 'w') as f:
        json.dump(history, f)

def load_conversation():
    try:
        with open(conversation_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []


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
            conversation_history = load_conversation()
            save_conversation(conversation_history)
            conversation_history = []
            save_conversation(conversation_history)
            return jsonify({"message": "Conversación terminada."}), 200
        
        messages = [
            {"role": "system", "content": "Solo temas psicológicos. No hablar de medicamentos. No pasar a otras páginas web. No hacer evaluaciones negativas. Mantener una rutina diaria para estructura y normalidad. Hacer actividad física para mejorar el estado de ánimo. Enfocar en objetivos pequeños para sentir menos agobio. Practicar técnicas de manejo del estrés como meditación, yoga y respiración profunda. Hacer cosas que te gustan para recuperar interés y placer en la vida. Escuchar sin juicios y sin diagnosticar. Animar a retomar actividades que antes reconfortaban, sin presionar. Ofrecer apoyo y aliento, sugiriendo hablar con un experto si es útil. No hablar con terceros del problema delante de la persona afectada. Recordar que estás disponible para ayudar y ofrecer apoyo continuo."},
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
            conversation_history = load_conversation()
            conversation_history.append({"role": "user", "content": content})
            conversation_history.append({"role": "assistant", "content": result})
            save_conversation(conversation_history)

            return jsonify(response_body), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    return jsonify({"message": "Por favor, envíe una solicitud POST con su contenido."}), 200


# Obtener todos los usuarios
@api.route('/users', methods=['GET'])
@jwt_required()
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



@api.route('/enviarmensaje', methods=['POST'])
@jwt_required()
def send_message():
    data = request.get_json()
# lo que le estamos enviando. 
   
    if 'conversation_id' not in data or 'message' not in data:
        return jsonify({"error": "Faltan datos (conversation_id, message)"}), 400
# validar si hay message y conversation id
    conversation_id = data['conversation_id']
    message_text = data['message']

# estamos comprobando si existe conversation id    
    conversation = Conversation.query.get(conversation_id)
    if conversation is None:
        return jsonify({"error": "La conversación no existe"}), 404

#   Crea una variable para almacenar los 2 en 1 
    new_message = Message(conversation_id=conversation_id, message=message_text)


    db.session.add(new_message)
    db.session.commit()

    return jsonify({"message": "Mensaje enviado", "data": new_message.serialize()}), 201

  
# Obtener un usuario por ID
@api.route('/user/<int:id>', methods=['GET'])
@jwt_required()
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
@jwt_required()
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
# mostrar todos los mensajes por ID
@api.route('/messages/<int:id>', methods=['GET'])
@jwt_required()
def get_messages_id(id):
    try:    
        messages = Message.query.get(id)
        if not messages:
            return jsonify({"message":"No hay messages"}),404
        return jsonify(messages.serialize()), 200

    except Exception as e:
        print(f"Error en el servidor: {str(e)}")

        return jsonify({
            "message":"Hay un error en el servidor",
            "error": str(e)
        }),500
        


# mostrar todos los mensajes
@api.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    try:
        messages = Message.query.all()
        if not messages:
            return jsonify({"message":"No hay messages"}),404
        
        return jsonify([message.serialize() for message in messages]), 200
    except Exception as e:
        print(f"Error en el servidor: {str(e)}")

        return jsonify({
            "message":"Hay un error en el servidor",
            "error": str(e)
        }),500
    
# Obtener todos los psicólogos
@api.route('/psychologists', methods=['GET'])
@jwt_required()
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
@jwt_required()
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
@jwt_required()
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
        # Manejo de JSON o form-data según el Content-Type
        if request.content_type == 'application/json':
            data = request.json
            photo_url = data.get('photo')
        else:
            data = request.form
            if 'photo' in request.files:
                img = request.files['photo']
                upload_result = cloudinary.uploader.upload(img)
                print(upload_result)
                photo_url = upload_result['url']
            else:
                photo_url = None

        new_psychologist = Psychologist(
            first_name=data['first_name'], last_name=data['last_name'],
            phone_number=data['phone_number'], email=data['email'],
            specialty=data['specialty'], years_of_experience=data['years_of_experience'],
            description=data['description'], photo=photo_url
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



@api.route('/generate_reset_token', methods=['POST'])
def generate_reset_token():
    email = request.json.get('email')
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Email not found"}), 404

    # Genera un token de JWT con un tiempo de expiración
    reset_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(minutes=30))

    return jsonify({"reset_token": reset_token}), 200


@api.route('/reset_password', methods=['POST'])
def reset_password():
    reset_token = request.json.get('reset_token')
    new_password = request.json.get('new_password')
  
    
    try:
        # Decodifica el token JWT para obtener la identidad del usuario
        user_id = decode_token(reset_token)['sub']
        user = User.query.get(user_id)

        if not user:
            return jsonify({"message": "Invalid token"}), 404

        # Aquí puedes implementar una función para hash la nueva contraseña, si no la tienes ya en el modelo.
        user.set_password(new_password)
        db.session.commit()

        return jsonify({"message": "Password reset successful"}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 400
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 400


# Cambio de contraseña
@api.route('/user/<int:user_id>', methods=['PATCH'])
def user_change(user_id):
    user=User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({"info":"Not found"}), 404
    user_body=request.get_json()

    if "username" in user_body:
        user.username=user_body["username"]


    if "email" in user_body:
        user.email=user_body["email"]

    if "password" in user_body:
        user.password=user_body["password"]

    
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize())