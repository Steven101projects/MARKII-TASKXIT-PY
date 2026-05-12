import { useEffect, useState } from "react";

export default function BoardNote({ isEditing }) {
  const [boardText, setBoardText] = useState("Resume!");
  const [token] = useState(localStorage.getItem("token"));

  // LOAD BOARD NOTE FROM BACKEND
  useEffect(() => {
    async function fetchBoardNote() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/boardnote",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch board note");
        }

        const data = await response.json();

        setBoardText(data.content);
      } catch (error) {
        console.error("Board note fetch error:", error);
      }
    }

    if (token) {
      fetchBoardNote();
    }
  }, [token]);

  // AUTO SAVE WITH DEBOUNCE
  useEffect(() => {
    if (!token) return;

    const timeout = setTimeout(async () => {
      try {
        await fetch(
          "http://127.0.0.1:8000/api/boardnote",
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              content: boardText,
            }),
          }
        );
      } catch (error) {
        console.error("Board note save error:", error);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [boardText, token]);

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