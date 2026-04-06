from pydantic import BaseModel
from datetime import datetime


# to avoid duplication, this is created for centralization.
class NoteBase(BaseModel):
    title: str
    content: str


class NoteCreate(NoteBase):
    pass

class NoteUpdate(BaseModel):
    title: str | None = None
    content: str | None = None

class NoteResponse(NoteBase):
    id: int
    folder_id: int
    created_at: datetime
    updated_at: datetime

    model_config = {
    "from_attributes": True
    }