from models.user import UserModel

def authenticate(username,password):
    user = UserModel.get_by_name(username) or UserModel.get_by_email(username)
    if user and UserModel.verify_hash(password, user.password):
        return user

def identity(payload):
    if 'identity' in payload:
        user_id = payload['identity']
        user = UserModel.get_by_id(user_id)
        return user
    elif 'email' in payload:
        user_email = payload['email']
        user = UserModel.get_by_name(user_email)
        return user


    