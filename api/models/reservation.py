from datetime import datetime
from database.db import db

class ReservationModel(db.Model):
    __tablename__ = "reservations"

    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime, nullable=False)
    customer_name = db.Column(db.String(80), nullable=False)
    customer_email = db.Column(db.String(80), nullable=False)    
    customer_phone = db.Column(db.String(20), nullable=False)   

    table_id = db.Column(db.Integer, db.ForeignKey('restaurant_tables.id'))
    table = db.relationship('RestaurantTableModel')    

    def __init__(self, date_time, customer_name, customer_email, customer_phone, table_id):
        self.date_time = date_time
        self.customer_name = customer_name
        self.customer_email = customer_email
        self.customer_phone = customer_phone
        self.table_id = table_id
    
    def json(self):
        return {
            'id': self.id,
            'date_time': self.date_time.strftime("%Y-%m-%d %H:%M:%S"),
            'customer_name': self.customer_name,
            'customer_email': self.customer_email,
            'customer_phone': self.customer_phone,
            'table_id': self.table_id,
        }

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(id=id).first() 

    @classmethod
    def get_by_table_id(cls, table_id):
        return cls.query.filter_by(table_id=table_id).all()
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()