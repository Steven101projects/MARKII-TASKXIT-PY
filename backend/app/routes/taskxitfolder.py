from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.taskxitfolder import Folder
from app.schemas.taskxitfolder import FolderCreate, FolderResponse, FolderUpdate

from app.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/folders", tags=["folders"])

@router.post("/", response_model=FolderResponse, status_code=status.HTTP_201_CREATED)

def create_folder(folder: FolderCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_folder = Folder(
        name=folder.name,
        user_id=current_user.id
    )

    db.add(new_folder)
    db.commit()
    db.refresh(new_folder)

    return new_folder

@router.get("/", response_model=list[FolderResponse], status_code=status.HTTP_201_CREATED)

def get_folders(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    folders = db.query(Folder).filter(Folder.user_id == current_user.id).all()

    return folders


@router.get("/{folder_id}", response_model=FolderResponse)

def get_folder(folder_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    folder = db.query(Folder).filter(
        Folder.id == folder_id,
        Folder.user_id == current_user.id
    ).first()

    if not folder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Folder not found"
        )
    
    return folder

@router.put("/{folder_id}", response_model=FolderResponse)

def update_folder(folder_id: int,
                  updated_data: FolderUpdate,
                    db: Session =Depends(get_db), current_user: User = Depends(get_current_user)):

    folder = db.query(Folder).filter(
        Folder.id == folder_id,
        Folder.user_id == current_user.id
    ).first()

    if not folder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Folder not found"
        )
    
    folder.name = updated_data.name

    db.commit()
    db.refresh(folder)
    
    return folder
    
@router.delete("/{folder_id}")

def delete_folder(
    folder_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    folder = db.query(Folder).filter(
        Folder.id == folder_id,
        Folder.user_id == current_user.id
    ).first()

    if not folder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Folder not found"
        )

    db.delete(folder)
    db.commit()

    return {"message": "Folder deleted successfully"}