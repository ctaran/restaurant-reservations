from models.restaurant import RestaurantModel
from models.user import UserModel
from flask_restful import Resource, reqparse

class User(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', 
        type=str,
        required=True,
        help="Name field cannot be left blank!"
    )
    parser.add_argument('password', 
        type=str,
        required=True,
        help="Password field cannot be left blank!"
    )
    parser.add_argument('email', 
    type=str,
    required=True,
    help="Email field cannot be left blank!"
    )    
    
    def get(self, name):
        user = UserModel.get_by_name(name)
        if user:
            return user.json()
        return {'message':'User {} not found'.format(name)}, 404


    def post(self):
        data = User.parser.parse_args()
        user = None

        if UserModel.get_by_name(data['name']):
            return {"message": "Cannot create user - name already exists"}, 400

        name = data['name']
        password = data['password']
        email = data['email']        
        user = UserModel(name, email, password=password)

        try:
            user.save_to_db()
        except Exception as err:
            return {"message": "An error occurred creating the user - {}".format(err)}, 500

        return user.json(), 201

    def delete(self, name):
        user = UserModel.get_by_name(name)

        if user:
            try:
                restaurant = RestaurantModel.get_by_manager_id(user.id)
                RestaurantModel.delete_from_db(restaurant)
                                
                user.delete_from_db()
                return {'message':'user deleted'}
            except Exception as err:
                return {"message": "An error occurred deleting the user - {}".format(err)}, 500

        return {'message':'No user with name - {} - exists'.format(name)}, 404
        
    def put(self, name):
        data = User.parser.parse_args()
        user = UserModel.get_by_name(name)

        if user:
            user.name = data['name']
            if data['password']:
                user.password = UserModel.generate_hash(data['password'])
            user.email = data['email']            
        else:
            name = data['name']
            password = data['password']
            email = data['email']           
            user = UserModel(name, email, password=password)

        try:
            user.save_to_db()
        except:
            return {"message": "An error occurred inserting the user"}, 500
        
        return user.json()

class UserList(Resource):

    def get(self):
        return {"users": [user.json() for user in UserModel.get_all_users()]}