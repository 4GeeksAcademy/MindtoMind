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
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)


    is_psychologist = db.Column(db.Boolean, default=False)
    chats = db.relationship('Chat', back_populates='user')
    blog_posts = db.relationship('BlogPost', back_populates='author')
    appointments = db.relationship('Appointment', foreign_keys='Appointment.user_id', back_populates='user')
    psychologist_appointments = db.relationship('Appointment', foreign_keys='Appointment.psychologist_id', back_populates='psychologist')

# Definición del modelo Chat (Chat)
class Chat(db.Model):
    __tablename__ = 'chats'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship('User', back_populates='chats')

# Definición del modelo BlogPost (Publicación del blog)
class BlogPost(db.Model):
    __tablename__ = 'blog_posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.Text, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    author = db.relationship('User', back_populates='blog_posts')

# Definición del modelo Test (Prueba)
class Test(db.Model):
    __tablename__ = 'tests'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    questions = db.relationship('Question', back_populates='test')

# Definición del modelo Question (Pregunta)
class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey('tests.id'))
    question_text = db.Column(db.Text, nullable=False)
    test = db.relationship('Test', back_populates='questions')
    answers = db.relationship('Answer', back_populates='question')

# Definición del modelo Answer (Respuesta)
class Answer(db.Model):
    __tablename__ = 'answers'
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    answer_text = db.Column(db.Text, nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    question = db.relationship('Question', back_populates='answers')

# Definición del modelo Appointment (Cita)
class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    psychologist_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    appointment_time = db.Column(db.DateTime, nullable=False)
    user = db.relationship('User', foreign_keys=[user_id], back_populates='appointments')
    psychologist = db.relationship('User', foreign_keys=[psychologist_id], back_populates='psychologist_appointments')

# Crear las tablas en la base de datos
with app.app_context():
    db.create_all()

