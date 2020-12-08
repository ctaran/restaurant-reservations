from sqlalchemy.sql.schema import Table
from models.table import TableModel
from flask_restful import Resource, reqparse
import ast

class Review(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('index', 
        type=int,
        required=True,
        help="Index field cannot be left blank!"
    )
    parser.add_argument('pos_x', 
        type=int,
        required=True,
        help="Pos X field cannot be left blank!"
    )
    parser.add_argument('pos_y', 
        type=int,
        required=True,
        help="Pos Y field cannot be left blank!"
    )
    parser.add_argument('seats', 
        type=int,
        required=True,
        help="Seats field cannot be left blank!"
    )
    parser.add_argument('restaurant_id', 
        type=int,
        required=True,
        help="Every Table needs a restaurant id!"
    )

    def post(self):
        data = Review.parser.parse_args()
        review = TableModel(**data)

        try:
            review.save_to_db()
        except Exception as err:
            return {"message": "An error occurred inserting the table - {}".format(err)}, 500

        return review.json(), 201

    def delete(self, id):
        review = TableModel.get_by_id(id)

        if Review:
            review.delete_from_db()
            return {'message':'table deleted'}

        return {'message':'No table with id {} exists'.format(id)}, 404
        
    def put(self, id):
        data = Review.parser.parse_args()
        table = TableModel.get_by_id(id)

        if table:
                table.pos_x = data["pos_x"]
                table.pos_y = data["pos_y"]
                table.seats = data["seats"]
        else:
                table = TableModel(id, **data)
                
        try:
            table.save_to_db()
        except:
            return {"message": "An error occurred inserting the table"}, 500
        
        return table.json()

class TableList(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('restaurant_id', type=int)

    def get(self):

        args = TableList.parser.parse_args()        

        if args['restaurant_id']:
            restaurant_id = args['restaurant_id']
            result = TableModel.get_by_restaurant_id(restaurant_id)
            return {"tables":[table.json() for table in result]}
        else:
            return {"message": "Missing Restaurant ID"}, 400

         

