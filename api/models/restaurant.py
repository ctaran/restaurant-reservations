from database.db import db

class RestaurantModel(db.Model):
    __tablename__ = "restaurants"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))    
    manager_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    manager = db.relationship('UserModel')

    def __init__(self, name, manager_id):
        self.name = name
        self.manager_id = manager_id
    
    def json(self):
        return {'id':self.id, 'name': self.name, 'manager':self.manager_id }

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def get_all_restaurants(cls):
        return cls.query.all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
  