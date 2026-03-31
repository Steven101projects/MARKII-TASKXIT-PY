# - User Schema Page: How data is received or returned by API
from pydantic import BaseModel, EmailStr

#Schema for incoming register data.
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

#Schema for outgoing data or API response
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    model_config = {
        "from_attributes": True
    }