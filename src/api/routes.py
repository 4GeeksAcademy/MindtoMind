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
