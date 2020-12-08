import os
from datetime import timedelta

class Config(object):
    """Parent configuration class."""
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database/reservations.db'
    JWT_AUTH_URL_RULE = '/api/auth'
    JWT_EXPIRATION_DELTA = timedelta(minutes=1800)
    JWT_AUTH_HEADER_PREFIX = "Bearer"


class DevelopmentConfig(Config):
    """Configurations for Development."""
    DEBUG = True
    SECRET_KEY = "super-secret-test-key"


class TestingConfig(Config):
    """Configurations for Testing."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database/reservations_test.db'
    DEBUG = True
    SECRET_KEY = "super-secret-test-key"


class StagingConfig(Config):
    """Configurations for Staging."""
    DEBUG = True


class ProductionConfig(Config):
    """Configurations for Production."""
    DEBUG = False
    TESTING = False


app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'staging': StagingConfig,
    'production': ProductionConfig,
}
