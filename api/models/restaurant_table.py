from database.db import db

class RestaurantTableModel(db.Model):
    __tablename__ = "restaurant_tables"

    id = db.Column(db.Integer, primary_key=True)
    index = db.Column(db.Integer, nullable=False)
    pos_x = db.Column(db.Integer, nullable=False)
    pos_y = db.Column(db.Integer, nullable=False)
    seats = db.Column(db.Integer, nullable=False)    

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    restaurant = db.relationship('RestaurantModel')    

    def __init__(self, index, pos_x, pos_y, seats, restaurant_id):
        self.index = index
        self.pos_x = pos_x
        self.pos_y = pos_y
        self.seats = seats
        self.restaurant_id = restaurant_id
    
    def json(self):
        return {
            'id': self.id,
            'index': self.index,
            'pos_x': self.pos_x, 
            'pos_y': self.pos_y, 
            'seats': self.seats, 
            'restaurant_id': self.restaurant_id
        }

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(id=id).first() 

    @classmethod
    def get_by_restaurant_id(cls, restaurant_id):
        return cls.query.filter_by(restaurant_id=restaurant_id).all()

    @classmethod
    def get_next_table_index(cls, restaurant_id):
        table = cls.query.filter_by(restaurant_id=restaurant_id).order_by(cls.index.desc()).first()
        if table:        
            return table.index + 1
        else:
            return 1
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()