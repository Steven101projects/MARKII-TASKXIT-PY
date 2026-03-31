# - Auth Schema Page: How data is received or returned by API

from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str