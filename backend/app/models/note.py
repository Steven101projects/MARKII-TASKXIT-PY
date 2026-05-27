from sqlalchemy import Column, ForeignKey, String, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid

from app.core.database import Base


class Note(Base):
    __tablename__ = "notes"

    id = Column(
        String,
        primary_key=True,
        index=True,
        default=lambda: str(uuid.uuid4())
    )

    title = Column(
        String(255),
        nullable=False
    )

    content = Column(
        Text,
        nullable=False
    )

    folder_id = Column(
        String,
        ForeignKey("folders.id"),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    folder = relationship(
        "Folder",
        back_populates="notes"
    )