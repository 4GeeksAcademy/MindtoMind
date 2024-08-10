"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager #libreria nueva 
from flask_bcrypt import Bcrypt  # Importar Flask-Bcrypt
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db,User,TokenBlockedList
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
# import cloudinary
# import cloudinary.uploader
# import cloudinary.api


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False


CORS(app, resources={r"/*": {"origins": "*"}})
# https://sturdy-space-memory-7v74r7vxgg9gfpj45-3000.app.github.dev

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # app.config['SECRET_KEY'] = 'your_secret_key'  # Agrega tu clave secreta
    # app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Agrega tu clave secreta para JWT

app.config['CLOUD_NAME'] =  os.getenv("CLOUD_NAME")
app.config['API_KEY'] =  os.getenv("API_KEY")
app.config['API_SECRET'] =  os.getenv("API_SECRET")

# cloudinary.config( 
#   cloud_name = app.config['CLOUD_NAME'], 
#   api_key = app.config['API_KEY'], 
#   api_secret = app.config['API_SECRET'],
#   secure = True
# )

MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

bcrypt = Bcrypt(app)
jwt = JWTManager(app) #libreria nueva 

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = TokenBlockedList.query.filter_by(jti=jti).first()

    return token is not None


# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

#cloudnary
# @app.route('/img', methods= ['POST'])
# def upload_img():
#     img = request.files["img"]
#     img_url= cloudinary.uploader.upload(img)

#     return jsonify({"img_url": img_url["url"]}), 200

# any other endpoint will try to serve it like a static file

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
