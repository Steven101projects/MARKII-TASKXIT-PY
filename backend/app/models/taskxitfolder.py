from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from app.core.database import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class Folder(Base):
    __tablename__ = "folders"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True, nullable=False)
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="folders")

    notes = relationship(
    "Note",
    back_populates="folder",
    cascade="all, delete-orphan"
)