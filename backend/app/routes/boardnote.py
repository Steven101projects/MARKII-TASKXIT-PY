from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from app.core.database import get_db
from app.deps import get_current_user

from app.models.user import User
from app.models.boardnote import BoardNote

from app.schemas.boardnote import (
    BoardNoteUpdate,
    BoardNoteResponse
)

router = APIRouter(
    prefix="/api/boardnote",
    tags=["boardnote"]
)

@router.get(
    "",
    response_model=BoardNoteResponse
)
def get_boardnote(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    boardnote = (
        db.query(BoardNote)
        .filter(BoardNote.user_id == current_user.id)
        .first()
    )

    # CREATE DEFAULT IF MISSING
    if not boardnote:

        boardnote = BoardNote(
            user_id=current_user.id,
            content="Resume!"
        )

        db.add(boardnote)
        db.commit()
        db.refresh(boardnote)

    return boardnote


# UPDATE BOARD NOTE
@router.put(
    "",
    response_model=BoardNoteResponse
)
def update_boardnote(
    boardnote_data: BoardNoteUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    boardnote = (
        db.query(BoardNote)
        .filter(BoardNote.user_id == current_user.id)
        .first()
    )

    # CREATE IF MISSING
    if not boardnote:

        boardnote = BoardNote(
            user_id=current_user.id
        )

        db.add(boardnote)

    boardnote.content = boardnote_data.content

    boardnote.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(boardnote)

    return boardnote