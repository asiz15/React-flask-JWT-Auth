"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token,get_jwt_identity
from datetime import timedelta

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def handle_register():

    request_data = request.get_json()

    if request_data == None:
        return jsonify({'message':'Bad request. You must provide email and password'}),400

    if request_data.get('email') == None or request_data.get('password') == None:
        return jsonify({'message':'Bad request. You must provide email and password.'}),400

    exists = User.query.filter_by(email=request_data.get('email')).first()
    if exists is not None:
        return jsonify({'message':'The provided email is already asociated with another account.'}),400
    newUser = User()
    newUser.email = request_data.get('email')
    newUser.password = request_data.get('password')
    newUser.is_active = True
    newUser.save()
   

    return jsonify({"message": "Success", "user": newUser.serialize()}), 200

@api.route('/login', methods=['POST'])
def handle_login():

    request_data = request.get_json()

    if request_data == None:
        return jsonify({'message':'Bad request. You must provide email and password'}),400

    if request_data.get('email') == None or request_data.get('password') == None:
        return jsonify({'message':'Bad request. You must provide email and password.'}),400

    user = User.query.filter_by(email=request_data['email']).first()

    if user is None:
        return jsonify({'message':'Unauthorized, bad credentials.'}),401

    if request_data['password'] != user.password:
        return jsonify({'message':'Unauthorized, bad credentials.'}),401


    if user is not None and request_data['password'] == user.password:
        expires = timedelta(days=1)
        acces_token = create_access_token(identity=user.id, expires_delta=expires)
        return jsonify({'message': 'Login succes!', 'user': user.serialize(), 'token': acces_token})
   
