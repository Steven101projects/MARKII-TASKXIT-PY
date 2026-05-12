from pydantic import BaseModel, Field
from datetime import datetime


class BoardNoteUpdate(BaseModel):
    content: str = Field(
        min_length=1,
        max_length=200
    )


class BoardNoteResponse(BaseModel):
    id: str
    content: str
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }