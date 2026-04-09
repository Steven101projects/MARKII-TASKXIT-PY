# - Configuration Page: The Connection to your Environtment Variables.

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    DATABASE_URL : str

    class Config:
        env_file = "backend/.env"

settings = Settings()