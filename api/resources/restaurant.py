from flask_restful import Resource, reqparse
from models.restaurant import RestaurantModel

class Restaurant(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('manager_id', 
        type=int,
        required=True,
        help="Every restaurant needs a manager ID!"
    )
    parser.add_argument('name', 
        type=str,
        required=True,
        help="Name cannot be left blank!"
    )

    def get(self, name):
        restaurant = RestaurantModel.get_by_name(name)
        if restaurant:
            return restaurant.json()
        return {'message':'restaurant not found'}, 404

    def post(self):
        data = Restaurant.parser.parse_args()
                
        if RestaurantModel.get_by_name(data["name"]):
            return {'message': 'restaurant already exists'}, 400

        restaurant = RestaurantModel(**data)

        try:
            restaurant.save_to_db()
        except Exception as err:
            return {"message": "An error occurred inserting the restaurant - {}".format(err)}, 500

        return restaurant.json(), 201

    def delete(self, name):
        restaurant = RestaurantModel.get_by_name(name)

        if restaurant:
            restaurant.delete_from_db()
            return {'message':'restaurant deleted'}

        return {'message':'No restaurant with name {} exists'.format(name)}, 404

class RestaurantList(Resource):

    def get(self):
        return {"restaurants": [restaurant.json() for restaurant in RestaurantModel.get_all_restaurants()]}
