from database.db import db
from passlib.hash import pbkdf2_sha256 as sha256

class UserModel(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    password = db.Column(db.String(80))
    email = db.Column(db.String(80))    

    def __init__(self, name, email, password=''):
        self.name = name
        self.password = UserModel.generate_hash(password)
        self.email = email        
    
    def json(self):
        return {'id':self.id, 'name': self.name, 'email': self.email }

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id = _id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def get_all_users(cls):
        return cls.query.all()

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)