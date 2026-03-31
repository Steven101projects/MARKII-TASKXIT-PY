# - Database Page: The Database connection file for the server.

from sqlalchemy import create_engine #Connection for FastAPI and the database
from sqlalchemy.orm import sessionmaker, declarative_base 
#sessionmaker: Creates a factory that will produce database sessions whenever your routes need to read or write data.
#declarative_base: To create a Base Class where all models will inherit from

#imported from config.py
from app.core.config import settings

DATABASE_URL = settings.DATABASE_URL

#The engine is the core object that knows how to talk to SQLite using the URL above.
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

#A session is what you actually use in your routes to do things like: db.add(user) / db.commit() / db.query(User).all()
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

#This creates the parent class for your models.
Base = declarative_base()

def get_db():
    # Creates a new database session.
    db = SessionLocal()
    try:
        # Hands that session to whatever route depends on it.
        yield db
    finally:
        db.close()