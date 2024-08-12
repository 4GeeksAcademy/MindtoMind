from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_bcrypt import Bcrypt

# Configuración de la aplicación Flask
app = Flask(__name__)
# Configuración de la URI de la base de datos y desactivación del seguimiento de modificaciones
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mental_health.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'
# Inicialización de la extensión Flask-SQLAlchemy

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

# Definición del modelo User (Usuario)
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    conversations = db.relationship('Conversation', back_populates='user')
    test_results = db.relationship('TestResult', back_populates='user')

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)


    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
            # no se serializa la contraseña por razones de seguridad
        }

# Definición del modelo Psychologist (Psicólogo)
class Psychologist(db.Model):
    __tablename__ = 'psychologists'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    specialty = db.Column(db.String(100), nullable=False)
    years_of_experience = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500), nullable=True)
    photo = db.Column(db.String(200), nullable=True)  # Ruta de la foto del psicólogo
    

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "years_of_experience": self.years_of_experience,
            "specialty": self.specialty,
            "photo":self.photo,
            "description": self.description
            # do not serialize the password, its a security breach
        }


# Definición del modelo Conversation (Conversación)
class Conversation(db.Model):
    __tablename__ = 'conversations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    started_on = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='conversations')
    messages = db.relationship('Message', back_populates='conversation')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "started_on": self.started_on
        }


# Definición del modelo Message (Mensaje)
class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'))
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    conversation = db.relationship('Conversation', back_populates='messages')

    def serialize(self):
        return {
            "id": self.id,
            "conversation_id":self.conversation_id,
            "menssage": self.message,
            "timestamp": self.timestamp,
            # do not serialize the password, its a security breach
        }


# Definición del modelo Test (Prueba)
class Test(db.Model):
    __tablename__ = 'tests'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    
    questions = db.relationship('Question', back_populates='test')

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            # do not serialize the password, its a security breach
        }

# Definición del modelo Question (Pregunta)
class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey('tests.id'))
    question_text = db.Column(db.Text, nullable=False)
    
    test = db.relationship('Test', back_populates='questions')
    answers = db.relationship('Answer', back_populates='question')

    def serialize(self):
        return {
           "id": self.id,
            "question_text": self.question_text
            # do not serialize the password, its a security breach
        }

# Definición del modelo Answer (Respuesta)
class Answer(db.Model):
    __tablename__ = 'answers'
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    answer_text = db.Column(db.Text, nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    
    question = db.relationship('Question', back_populates='answers')

    def serialize(self):
        return {
            "id": self.id,
            "answer_text": self.answer_text,
            "is_correct": self.is_correct,
            # do not serialize the password, its a security breach
        }
    
# Definición del modelo TestResult (Resultado de Prueba)
class TestResult(db.Model):
    __tablename__ = 'test_results'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    test_id = db.Column(db.Integer, db.ForeignKey('tests.id'))
    score = db.Column(db.Integer, nullable=False)
    taken_on = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='test_results')
    test = db.relationship('Test')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "test_id": self.test_id,
            "score": self.score,
            "taken_on": self.taken_on
        }

class TokenBlockedList(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    jti=db.Column(db.String(100),nullable=False)

# Crear las tablas en la base de datos
with app.app_context():
    db.create_all()