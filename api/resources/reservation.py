from datetime import date, datetime
from models.reservation import ReservationModel
from flask_restful import Resource, reqparse
from flask_jwt import jwt_required

class Reservation(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('date_time', 
        type=str,
        required=True,
        help="Date-Time cannot be left blank!"
    )
    parser.add_argument('customer_name', 
        type=str,
        required=True,
        help="Customer Name cannot be left blank!"
    )
    parser.add_argument('customer_email', 
        type=str,
        required=True,
        help="Customer Email cannot be left blank!"
    )
    parser.add_argument('customer_phone', 
        type=str,
        required=True,
        help="Customer Phone No cannot be left blank!"
    )
    parser.add_argument('table_id', 
        type=int,
        help="Every Reservation needs a table id!"
    )

    @jwt_required()
    def post(self):
        data = Reservation.parser.parse_args()

        date_time = datetime.strptime(data['date_time'], "%Y-%m-%d %H:%M:%S")
        customer_name = data["customer_name"]
        customer_email = data["customer_email"]
        customer_phone = data["customer_phone"]
        table_id = data["table_id"]
        reservation = ReservationModel(date_time, customer_name, customer_email, customer_phone, table_id)

        try:
            reservation.save_to_db()
        except Exception as err:
            return {"message": "An error occurred inserting the table - {}".format(err)}, 500

        return reservation.json(), 201

    @jwt_required()
    def delete(self, id):
        reservation = ReservationModel.get_by_id(id)

        if reservation:
            reservation.delete_from_db()
            return {'message':'table deleted'}

        return {'message':'No table with id {} exists'.format(id)}, 404
        
    @jwt_required()
    def put(self, id):
        data = Reservation.parser.parse_args()
        reservation = ReservationModel.get_by_id(id)

        if reservation:
                reservation.date_time = datetime.strptime(data['date_time'], "%Y-%m-%d %H:%M:%S")
                reservation.customer_name = data["customer_name"]
                reservation.customer_email = data["customer_email"]
                reservation.customer_phone = data["customer_phone"]
        else:
                return {"message": "Creating Reservation via PUT is not supported"}, 400
                
        try:
            reservation.save_to_db()
        except:
            return {"message": "An error occurred updating the reservation"}, 500
        
        return reservation.json()

class ReservationList(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('table_id', type=int)
    parser.add_argument('date', type=str)

    @jwt_required()
    def get(self):

        args = ReservationList.parser.parse_args()   
                 
        if args['table_id']:
            table_id = args['table_id']
            result = ReservationModel.get_by_table_id(table_id)
            
            if args['date']:
                date = args['date']
                return {"reservations":[reservation.json() for reservation in result if date in str(reservation.date_time)]}

            return {"reservations":[reservation.json() for reservation in result]}
        else:
            return {"message": "Missing Table ID"}, 400

         

