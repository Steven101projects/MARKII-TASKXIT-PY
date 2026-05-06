import { useEffect, useState } from "react";

export default function BoardNote({ isEditing }) {
  const [boardText, setBoardText] = useState("Resume!");

  useEffect(() => {
    const savedBoardText = localStorage.getItem("boardNoteText");

    if (savedBoardText) {
      setBoardText(savedBoardText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("boardNoteText", boardText);
  }, [boardText]);

  return (
    <div
      className="bg-secondary w-2/3 md:w-2/3 h-60
      rounded-3xl mb-6 lg:mt-6 flex justify-center items-center
      border-2"
    >
      <div
        className="bg-white w-full mx-2 h-56
        rounded-2xl border-2 border-[#2d2727]
        flex justify-center items-center text-4xl lg:text-5xl text-primary font-bold"
      >
        {isEditing ? (
          <input
            type="text"
            value={boardText}
            onChange={(e) => setBoardText(e.target.value)}
            placeholder="Write your board note..."
            className="w-full text-center bg-transparent outline-none px-4"
            autoFocus
          />
        ) : (
          <p className="text-center px-4 break-words">{boardText}</p>
        )}
      </div>
    </div>
  );
}