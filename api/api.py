import os
from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt import JWT

from config import app_config
from database.db import db
from auth.security import authenticate, identity
from resources.routes import initialize_routes

app = Flask(__name__)
launch_env = os.getenv('FLASK_ENV')
app.config.from_object(app_config[launch_env])

api = Api(app)

@app.before_first_request
def create_tables():
    db.create_all()

jwt = JWT(app, authenticate, identity)  # /api/auth
db.init_app(app)

@jwt.auth_response_handler
def customized_response_handler(access_token, identity):
    return jsonify({
                        'access_token': access_token.decode('utf-8'),
                        'id': identity.id,
                        'name': identity.name,
                        'email': identity.email                        
                   })

# @jwt.jwt_decode_handler
# def jwt_decode_handler(access_token):
#     secret = app.config['SECRET_KEY']
#     decoded = jwt_lib.decode(access_token, secret)
#     return decoded

initialize_routes(api)

if __name__ == "__main__":
    from database.db import db
    db.init_app(app)