# - User Model Page: This is where the database structure of User is defined.

#SQLALCHEMY is a model creator for sqlLite
from sqlalchemy import Column, Integer, String

#imported from database.py
from app.core.database import Base

from sqlalchemy.orm import relationship


#Schema of the User Database
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    account_mode = Column(String, nullable=False, default="local")

    folders = relationship("Folder", back_populates="owner")