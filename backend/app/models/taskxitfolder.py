from sqlalchemy import Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.core.database import Base


class Folder(Base):
    __tablename__ = "folders"

    id = Column(
        String,
        primary_key=True,
        index=True,
        default=lambda: str(uuid.uuid4())
    )

    name = Column(
        String(50),
        unique=True,
        index=True,
        nullable=False
    )

    user_id = Column(
        String,
        ForeignKey("users.id"),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    owner = relationship(
        "User",
        back_populates="folders"
    )

    notes = relationship(
        "Note",
        back_populates="folder",
        cascade="all, delete-orphan"
    )