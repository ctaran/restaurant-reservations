from models.restaurant_table import RestaurantTableModel
from flask_restful import Resource, reqparse

class RestaurantTable(Resource):
    parser = reqparse.RequestParser()
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

    def get(self, id):
        table = RestaurantTableModel.get_by_id(id)
        if table:
            return dict(table.json(), **{ "reservations" : [reservation.json() for reservation in table.reservations]})
        return {'message':'restaurant not found'}, 404

    def post(self):
        data = RestaurantTable.parser.parse_args()
        index = RestaurantTableModel.get_next_table_index(data["restaurant_id"])
        table = RestaurantTableModel(index,**data)
        
        try:
            table.save_to_db()
        except Exception as err:
            return {"message": "An error occurred inserting the table - {}".format(err)}, 500

        return table.json(), 201

    def delete(self, id):
        table = RestaurantTableModel.get_by_id(id)

        if table:
            table.delete_from_db()
            return {'message':'table deleted'}

        return {'message':'No table with id {} exists'.format(id)}, 404
        
    def put(self, id):
        data = RestaurantTable.parser.parse_args()
        table = RestaurantTableModel.get_by_id(id)

        if table:
                table.pos_x = data["pos_x"]
                table.pos_y = data["pos_y"]
                table.seats = data["seats"]
        else:
                table = RestaurantTableModel(id, **data)
                
        try:
            table.save_to_db()
        except:
            return {"message": "An error occurred inserting the table"}, 500
        
        return table.json()

class RestaurantTableList(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('restaurant_id', type=int)

    def get(self):

        args = RestaurantTableList.parser.parse_args()        

        if args['restaurant_id']:
            restaurant_id = args['restaurant_id']
            result = RestaurantTableModel.get_by_restaurant_id(restaurant_id)
            return {"tables":[table.json() for table in result]}
            # return {"tables":[ dict(table.json(), **{ "reservations" : [reservation.json() for reservation in table.reservations]}) for table in result]}
        else:
            return {"message": "Missing Restaurant ID"}, 400

         

