from resources.reservation import Reservation, ReservationList
from resources.restaurant_table import RestaurantTable, RestaurantTableList
from resources.restaurant import Restaurant, RestaurantList
from resources.user import User, UserList

def initialize_routes(api):

    api.add_resource(User, '/api/user/<string:name>', '/api/user/new')
    api.add_resource(UserList, '/api/users')

    api.add_resource(Restaurant, '/api/restaurant/<string:name>', '/api/restaurant/new')
    api.add_resource(RestaurantList, '/api/restaurants')

    api.add_resource(RestaurantTable, '/api/table/<string:id>', '/api/table/new')
    api.add_resource(RestaurantTableList, '/api/tables')

    api.add_resource(Reservation, '/api/reservation/<string:id>', '/api/reservation/new')
    api.add_resource(ReservationList, '/api/reservations')