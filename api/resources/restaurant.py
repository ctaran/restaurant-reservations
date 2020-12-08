from flask_restful import Resource, reqparse
from models.restaurant import RestaurantModel

class Restaurant(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('manager_id', 
        type=int,
        required=True,
        help="This field cannot be left blank!"
    )

    def get(self, name):
        restaurant = RestaurantModel.find_by_name(name)
        if restaurant:
            return restaurant.json()
        return {'message':'restaurant not found'}, 404

    def post(self, name):
        if RestaurantModel.find_by_name(name):
            return {'message': 'restaurant already exists'}, 400

        data = Restaurant.parser.parse_args()
        restaurant = RestaurantModel(name, **data)

        try:
            restaurant.save_to_db()
        except Exception as err:
            return {"message": "An error occurred inserting the restaurant - {}".format(err)}, 500

        return restaurant.json(), 201

    def delete(self, name):
        restaurant = RestaurantModel.find_by_name(name)

        if restaurant:
            restaurant.delete_from_db()
            return {'message':'restaurant deleted'}

        return {'message':'No restaurant with name {} exists'.format(name)}, 404
