import json
import uuid
import urllib

from fastapi import FastAPI
from models import User, UserModel
from typing import Optional, Dict


app = FastAPI()


@app.get("/users")
async def list_users(per_page: Optional[int] = 5, from_item: Optional[str] = None):
    last_evaluated_key = json.loads(urllib.parse.unquote_plus(from_item)) if from_item else None
    users = User.scan(limit=per_page, last_evaluated_key=last_evaluated_key)
    user_models = [UserModel.from_orm(user) for user in users]
    return {"results": user_models, "last_evaluated_key": urllib.parse.quote_plus(json.dumps(users.last_evaluated_key))}

@app.post("/users")
async def create_user(user: UserModel):
    u = User(**user.dict())
    u.save()
    return UserModel.from_orm(u)
