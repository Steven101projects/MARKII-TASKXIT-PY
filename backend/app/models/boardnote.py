from sqlalchemy import Column, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid

from app.core.database import Base


class BoardNote(Base):
    __tablename__ = "board_notes"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    user_id = Column(
        String,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    content = Column(
        Text,
        nullable=False,
        default="Resume!"
    )

    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )

    owner = relationship("User")