import { useEffect, useState } from "react";
import API from "../../api/index.js";

export default function BoardNote({ isEditing }) {
  const [boardText, setBoardText] = useState("Resume!");

  // LOAD BOARD NOTE FROM BACKEND
  useEffect(() => {
    async function fetchBoardNote() {
      try {
        const response = await API.get("/api/boardnote");

        setBoardText(response.data.content);
      } catch (error) {
        console.error("Board note fetch error:", error);
      }
    }

    fetchBoardNote();
  }, []);

  // AUTO SAVE WITH DEBOUNCE
  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        await API.put("/api/boardnote", {
          content: boardText,
        });
      } catch (error) {
        console.error("Board note save error:", error);
      }
    }, 800);

    return () => clearTimeout(timeout);
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
            placeholder="Click the pencil icon to write here!"
            className="w-full text-center bg-transparent outline-none px-4"
            autoFocus
          />
        ) : (
          <p className="text-center px-4 break-words">
            {boardText}
          </p>
        )}
      </div>
    </div>
  );
}