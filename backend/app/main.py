# TASKXIT API (TASKXIT v.1 [Backend])
# - Main Page: The Server.js of FASTApi/ Main server file of the server.

# outside package imports:
from fastapi import Depends, FastAPI

# allows frontend to communicate with backend
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.routes.auth import router as auth_router
from app.deps import get_current_user
from app.schemas.user import UserResponse

#Reads all your models (like User) Creates corresponding tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#This plugs in your auth routes.
app.include_router(auth_router)

@app.get("/api/health")
def health():
    return {"status": "OK"}

#Checks the Current User Logged In to the program.
@app.get("/api/me", response_model=UserResponse)
def get_me(current_user = Depends(get_current_user)):
    return current_user
