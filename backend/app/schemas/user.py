# - User Schema Page: How data is received or returned by API
from pydantic import BaseModel, EmailStr

#Schema for incoming register data.
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    account_mode: str = "local"

#Schema for outgoing data or API response
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    account_mode: str

    model_config = {
        "from_attributes": True
    }