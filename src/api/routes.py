"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# @api.route('/demo', methods=['POST', 'GET'])
# # esto es una prueba a ia nos contesta desde el link 
# def handleIA():
#     if request.method == 'POST':
#         data = request.get_json()
#         content = data.get('content')

#         # Si el usuario escribe esta palabra, acabará la conversación.
#         if content == "exit":
#             return jsonify({"message": "Conversación terminada."}), 200

#         messages = [{"role": "system", "content": "Eres psicólogo muy útil recomendando ejercicios"},
#                     {"role": "user", "content": content}]

#         response = client.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages=messages
#         )
#         print(type(response))


        
#         result = response['choices'][0]['message']['content']

#         response_body = {
#             "message": result
#         }

#         return jsonify(response_body), 200

#     # Para la solicitud GET, podrías devolver un mensaje simple o una instrucción de uso.
#     return jsonify({"message": "Por favor, envíe una solicitud POST con su contenido."}), 200

# @api.route('/demo', methods=['POST'])
# def handleIA():
#     if request.method == 'POST':
#         data = request.get_json()
#         content = data.get('content')
#         # Si el usuario escribe esta palabra, acabará la conversación.
#         if content == "exit":
#             return jsonify({"message": "Conversación terminada."}), 200
#         messages = [
#             {"role": "system", "content": "Eres psicólogo muy útil recomendando ejercicios"},
#             {"role": "user", "content": content}
#         ]
#         response = openai.client.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages=messages
#         )
#         print(type(response))
        
#         # Access the response correctly
#         if response.choices and len(response.choices) > 0:
#             result = response.choices[0].message['content']
#             response_body = {
#                 "message": result
#             }
#             return jsonify(response_body), 200
#         else:
#             return jsonify({"message": "No se obtuvo una respuesta válida del modelo."}), 500
    
#     # Para la solicitud GET, podrías devolver un mensaje simple o una instrucción de uso.
#     return jsonify({"message": "Por favor, envíe una solicitud POST con su contenido."}), 200

def get_openai_response(messages):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {os.getenv('API_KEY_AI')}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": messages
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.text}


@api.route('/demo', methods=['POST'])
def handleIA():
    if request.method == 'POST':
        data = request.get_json()
        content = data.get('content')

        if content == "exit":
            return jsonify({"message": "Conversación terminada."}), 200

        messages = [
            {"role": "system", "content": "Eres psicólogo muy útil recomendando ejercicios"},
            {"role": "user", "content": content}
        ]

        try:
            response = get_openai_response(messages)
            
            if "error" in response:
                return jsonify({"error": response["error"]}), 500

            result = response['choices'][0]['message']['content']
            response_body = {
                "message": result
            }
            return jsonify(response_body), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Por favor, envíe una solicitud POST con su contenido."}), 200


if __name__ == '__main__':
    app.run(debug=True)
