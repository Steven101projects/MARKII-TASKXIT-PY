from sqlalchemy import Column, ForeignKey, Integer, String,Text, DateTime
from app.core.database import Base
from datetime import datetime, timezone
from sqlalchemy.orm import relationship


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)

    folder_id = Column(Integer, ForeignKey("folders.id"), nullable=False)

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

    folder = relationship("Folder", back_populates="notes")