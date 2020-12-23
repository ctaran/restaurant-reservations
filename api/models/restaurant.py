from database.db import db

class RestaurantModel(db.Model):
    __tablename__ = "restaurants"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))    
    manager_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    manager = db.relationship('UserModel')
    tables = db.relationship('RestaurantTableModel', back_populates='restaurant')

    def __init__(self, name, manager_id):
        self.name = name
        self.manager_id = manager_id
    
    def json(self):
        return {'id':self.id, 'name': self.name, 'manager_id':self.manager_id }

    @classmethod
    def get_by_id(cls, _id):
        return cls.query.filter_by(id = _id).first()

    @classmethod
    def get_by_manager_id(cls, manager_id):
        return cls.query.filter_by(manager_id = manager_id).first()

    @classmethod
    def get_by_name(cls, name):
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
  