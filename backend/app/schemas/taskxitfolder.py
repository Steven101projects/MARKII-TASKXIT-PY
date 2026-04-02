from pydantic import BaseModel
from datetime import datetime


class FolderCreate(BaseModel):
    name: str

class FolderResponse(BaseModel):
    id: int
    name: str
    user_id: str
    created_at: datetime

    model_config = {
    "from_attributes": True
    }

class FolderUpdate(BaseModel):
    name: str