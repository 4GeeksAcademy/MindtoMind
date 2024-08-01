from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Configuración de la aplicación Flask
app = Flask(__name__)
# Configuración de la URI de la base de datos y desactivación del seguimiento de modificaciones
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mental_health.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicialización de la extensión Flask-SQLAlchemy
db = SQLAlchemy(app)

# Definición del modelo User (Usuario)
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    chats = db.relationship('Chat', back_populates='user')
    psychologists = db.relationship('Psychologist', back_populates='user')
    
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
            # do not serialize the password, its a security breach
        }





# Definición del modelo Psychologist (Psicólogo)
class Psychologist(db.Model):
    __tablename__ = 'psychologists'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    specialty = db.Column(db.String(100), nullable=False)
    years_of_experience = db.Column(db.Integer, nullable=False)
    
    user = db.relationship('User', back_populates='psychologists')

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "years_of_experience": self.years_of_experience,
            "specialty": self.specialty
            # do not serialize the password, its a security breach
        }


# Definición del modelo Chat (Chat)
class Chat(db.Model):
    __tablename__ = 'chats'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='chats')

    def serialize(self):
        return {
            "id": self.id,
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

# Crear las tablas en la base de datos
with app.app_context():
    db.create_all()

