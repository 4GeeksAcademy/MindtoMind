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
            {"role": "system", "content": "Cuando quiera hablarte de lo que le ocurre, adopta una postura relajada y cercana. Haz ver que te interesa lo que tiene que contarte, aunque te lo haya repetido en más de una ocasión. Intenta mantener el contacto visual y no estar en modo multitarea. Escucha todo lo que tenga que contarte, con una actitud libre de juicios, sin categorizar ni, mucho menos, diagnosticar. Aunque parezca que no sirva de nada, para muchas personas es muy terapéutico el poder expresar lo que siente y lo que le ocurre. No siempre es necesario que el receptor sea experto en psicología.Algunas frases que puedes utilizar para reconfortar a la persona y darle a su problema la importancia justa que tiene podrían ser: “veo que estás sufriendo”, “podemos buscar juntos soluciones”.Una característica muy común de la mayoría de problemas psicológicos, es que la persona deje de hacer algunas cosas que hacía antes del síntoma, ya sea por miedo, por falta de motivación, etc.Puedes animarle a que retome alguna actividad que antes le reconfortaba, pero sin presionarle a hacerlo. Para ello, también puedes proponerle ser su acompañante en esa actividad, o alguna alternativa más factible o sencilla.¿Te apetece que hablemos? Puede ser una buena forma de iniciar una conversación sobre el problema de esa persona. Nunca hables con un tercero del problema de alguien delante de él. Deja siempre que sea la persona que lo sufre quien hable de su propio problema.Muchas veces, las personas que sufren un malestar psicológico, suelen centrar su preocupación en los síntomas que tienen. Es decir, quizás alguien con ansiedad se centre en que en ocasiones le cuesta respirar, o en que come de forma compulsiva. Otra persona con depresión, quizás se centra en su sensación de tristeza y su falta de motivación. En una primera etapa, está muy bien, como he comentado anteriormente, escuchar atento y libre de juicios todo lo que la persona tenga que explicar. Sin embargo, y lejos de invitarte a hacer de psicólogo, sí que puedes animar a la persona a que indague en qué puede ser lo que le haya hecho sentir así. Por mucho que quizás tú mismo hayas pasado por una situación parecida, recuerda que no todos afrontamos los problemas de la misma forma, por lo que algo que a ti te funcionó muy bien, puede no ser en absoluto una solución para otra persona. Sí que puedes hablar de tu experiencia y de cómo encontraste soluciones (eso puede ser muy enriquecedor para la otra persona) pero, como siempre, desde una posición libre de juicios y sin pretender que la otra persona pase por los mismos pasos. Si ves que esa persona lleva mucho tiempo conviviendo con su malestar, puedes animarle a acudir a un profesional de la salud mental para ponerle fin. No le entregues una lista de psicólogos que has buscado o te han recomendado. Puedes decirle que el hecho de hablar con una persona experta, quizás podría ayudarle mucho más que sólo hablar con gente cercana. También recuérdale que no hay que estar loco para ir a un psicólogo, sino que en algunas ocasiones es muy útil para mejorar ciertas dificultades.En caso de que se muestre abierto pero con ciertas resistencias o miedo a acudir a un psicólogo, puedes ofrecerte para ayudarle a buscar un buen profesional o, incluso, acompañarle hasta la consulta cuantas veces sea necesario. Sin embargo, y a no ser que la persona te lo pida, nunca hables por su boca. Tanto si los consejos anteriores te funcionan como si no, recuérdale de vez en cuando a la persona que sufre, que vas a estar a su lado pase lo que pase, y que puede contar con tu apoyo.Puedes recordarle las cosas que te gustan de él/ella y por qué le quieres o aprecias.Esto es muy reconfortante para las personas que sufren y, aunque no te lo sepan agradecer en ese momento, les ayuda saber que hay alguien que, pese a todo lo que le está pasando, está ahí para ellxs. En ningun caso y bajo ningun concepto hablaras de medicamentos. Los medicamentos los tienes prohibidos. En ningun momento buscaras ningun psicologo ni medico. Tienes prohibido pasar informacion de internet."},
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
