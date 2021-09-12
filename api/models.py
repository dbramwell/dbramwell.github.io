import os

from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute
from pydantic import BaseModel, constr
from utils import table_names

if os.getenv("LOCALSTACK_HOSTNAME", False):
    DYNAMODB_ENDPOINT = "http://" + os.getenv("LOCALSTACK_HOSTNAME") + ":4566"

class User(Model):
    class Meta:
        host = DYNAMODB_ENDPOINT
        table_name = table_names["User"]
    email = UnicodeAttribute(hash_key=True)
    first_name = UnicodeAttribute()
    last_name = UnicodeAttribute(range_key=True)

class UserModel(BaseModel):
    email: str
    first_name: str
    last_name: str

    class Config:
        orm_mode = True