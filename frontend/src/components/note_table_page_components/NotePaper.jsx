import { useState, useEffect, useRef } from "react";

function NoteCard({ folderId, currentNote, setCurrentNote, onNoteSaved }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const saveTimer = useRef(null);
  const isLoadingNote = useRef(false);

  useEffect(() => {
    if (currentNote) {
      isLoadingNote.current = true;
      setTitle(currentNote.title || "");
      setContent(currentNote.content || "");
      setError("");
      setSaveStatus("");

      setTimeout(() => {
        isLoadingNote.current = false;
      }, 0);
    }
  }, [currentNote]);

  useEffect(() => {
    if (isLoadingNote.current) return;
    if (!currentNote) return;
    if (!folderId) return;

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    setError("");
    setSaveStatus("Saving...");

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    saveTimer.current = setTimeout(() => {
      autoSaveNote(title, content);
    }, 700);

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, [title, content]);

  async function autoSaveNote(newTitle, newContent) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/api/notes/${currentNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: newTitle.trim(),
            content: newContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNote = await response.json();

      setCurrentNote(updatedNote);

      if (onNoteSaved) {
        onNoteSaved(updatedNote);
      }

      setSaveStatus("Saved");
    } catch (err) {
      console.error(err);
      setError("Could not save note.");
      setSaveStatus("");
    }
  }

  return (
    <div
      className="w-[50%] h-[110vh] m-8 border-[#ffbd59] border-2 rounded-2xl bg-white p-4
      transform translate-y-0 hover:-translate-y-8 transition-transform duration-300"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full font-bold text-3xl mb-2 outline-none placeholder:text-black"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your note here..."
        className="w-full h-[85%] text-2xl placeholder:text-gray-600 outline-none resize-none"
      />

      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      {saveStatus && <p className="text-sm text-gray-500">{saveStatus}</p>}
    </div>
  );
}

function MobileNoteCard({ folderId, currentNote, setCurrentNote, onNoteSaved }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const saveTimer = useRef(null);
  const isLoadingNote = useRef(false);

  useEffect(() => {
    if (currentNote) {
      isLoadingNote.current = true;
      setTitle(currentNote.title || "");
      setContent(currentNote.content || "");
      setError("");
      setSaveStatus("");

      setTimeout(() => {
        isLoadingNote.current = false;
      }, 0);
    }
  }, [currentNote]);

  useEffect(() => {
    if (isLoadingNote.current) return;
    if (!currentNote) return;
    if (!folderId) return;

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    setError("");
    setSaveStatus("Saving...");

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    saveTimer.current = setTimeout(() => {
      autoSaveNote(title, content);
    }, 700);

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, [title, content]);

  async function autoSaveNote(newTitle, newContent) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/api/notes/${currentNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: newTitle.trim(),
            content: newContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNote = await response.json();

      setCurrentNote(updatedNote);

      if (onNoteSaved) {
        onNoteSaved(updatedNote);
      }

      setSaveStatus("Saved");
    } catch (err) {
      console.error(err);
      setError("Could not save note.");
      setSaveStatus("");
    }
  }

  return (
    <div
      className="h-[70vh] m-4 mt-12 border-[#ffbd59] border-2 rounded-2xl bg-white
      p-4 flex flex-col transform translate-y-0 hover:-translate-y-8 transition-transform duration-300"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full font-bold text-3xl mb-2 bg-transparent outline-none placeholder:text-black"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your note here..."
        className="flex-1 w-full text-2xl placeholder:text-gray-600 bg-transparent outline-none resize-none"
      />

      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      {saveStatus && <p className="text-sm text-gray-500">{saveStatus}</p>}
    </div>
  );
}

function PaperSheet({ modes, folderId, currentNote, setCurrentNote, onNoteSaved }) {
  if (modes === "mobile") {
    return (
      <MobileNoteCard
        folderId={folderId}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        onNoteSaved={onNoteSaved}
      />
    );
  }

  return (
    <NoteCard
      folderId={folderId}
      currentNote={currentNote}
      setCurrentNote={setCurrentNote}
      onNoteSaved={onNoteSaved}
    />
  );
}

function OpenFolder({ modes, notes, currentNote, onCreateNew, onSelectNote }) {
  function SmallPapers({ note }) {
    const isSelected = currentNote && currentNote.id === note.id;

    return (
      <div
        onClick={() => onSelectNote(note)}
        className={`${
          modes === "mobile" ? "h-[30vh] mx-8 my-2" : "h-[40vh] mx-8 my-4"
        } border-2 rounded-2xl bg-white p-4 cursor-pointer overflow-hidden
        transform translate-y-0 hover:-translate-y-8 transition-transform duration-300
        ${isSelected ? "border-[#ffbd59]" : "border-gray-300"}`}
      >
        <div
          className={
            modes === "mobile"
              ? "font-bold text-xl mb-2 min-w-0"
              : "font-bold text-2xl mb-2 min-w-0"
          }
        >
          <p className="truncate" title={note.title}>
            {note.title}
          </p>
        </div>

        <div className={modes === "mobile" ? "text-lg" : "text-xl"}>
          <p
            className="
              text-gray-600
              overflow-hidden
              break-words
              [display:-webkit-box]
              [-webkit-box-orient:vertical]
              [-webkit-line-clamp:5]
            "
            title={note.content || "Empty note"}
          >
            {note.content ? note.content : "Empty note"}
          </p>
        </div>
      </div>
    );
  }

  if (modes === "mobile") {
    return (
      <div className="pt-12 w-full h-[83vh] overflow-hidden overflow-y-auto grid grid-cols-2 gap-2 custom-scroll ml-2 relative">
        {notes.map((note) => (
          <SmallPapers key={note.id} note={note} />
        ))}

        <div
          onClick={onCreateNew}
          className="mx-8 my-4 border-gray-500 border-2 rounded-2xl bg-[#e3e3e3] text-gray-500
          p-4 flex justify-center items-center cursor-pointer
          transform translate-y-0 hover:-translate-y-8 transition-transform duration-300"
        >
          <div className="font-bold text-8xl mb-2">
            <p>+</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 w-[50%] h-[92vh] overflow-hidden overflow-y-auto grid grid-cols-3 gap-2 custom-scroll ml-2 relative">
      {notes.map((note) => (
        <SmallPapers key={note.id} note={note} />
      ))}

      <div
        onClick={onCreateNew}
        className="h-[40vh] mx-8 my-4 border-gray-500 border-2 rounded-2xl bg-[#e3e3e3] text-gray-500
        p-4 flex justify-center items-center cursor-pointer
        transform translate-y-0 hover:-translate-y-8 transition-transform duration-300"
      >
        <div className="font-bold text-8xl mb-2">
          <p>+</p>
        </div>
      </div>
    </div>
  );
}

function OpenModes({ modes, folderId, currentNote, setCurrentNote, onNoteSaved }) {
  if (modes === "mobile") {
    return (
      <div>
        <div className="text-center">
          <p className="font-bold text-white text-3xl mb-10">Modes</p>

          <div id="otherPapers" className="flex gap-12 text-white font-bold m-4 mb-8 justify-center">
            <div className="text-center hover:scale-110 transition-transform cursor-pointer">
              <img src="/note-svgrepo-com.svg" alt="Notes" className="w-32 invert" />
              <p className="text-2xl mt-4">Notes</p>
            </div>

            <div className="text-center hover:scale-110 transition-transform cursor-pointer">
              <img src="/list-check-svgrepo-com.svg" alt="Checklist" className="w-32 invert" />
              <p className="text-2xl mt-4">Checklist</p>
            </div>

            <div className="text-center hover:scale-110 transition-transform cursor-pointer">
              <img src="/notes-note-svgrepo-com.svg" alt="Numbered List" className="w-32 invert" />
              <p className="text-xl mt-5">Numbered List</p>
            </div>
          </div>
        </div>

        <PaperSheet
          modes={modes}
          folderId={folderId}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          onNoteSaved={onNoteSaved}
        />
      </div>
    );
  }

  return (
    <PaperSheet
      modes={modes}
      folderId={folderId}
      currentNote={currentNote}
      setCurrentNote={setCurrentNote}
      onNoteSaved={onNoteSaved}
    />
  );
}

export default function NotePaper({
  mode,
  toggleOptions,
  setToggleOptions,
  folderId,
  currentNote,
  setCurrentNote,
}) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (folderId) {
      fetchNotes();
    } else {
      setNotes([]);
    }
  }, [folderId]);

  async function fetchNotes() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/api/folders/${folderId}/notes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load notes");
      }

      const data = await response.json();

      const sortedNotes = [...data].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      setNotes(sortedNotes);
    } catch (err) {
      console.error(err);
    }
  }

  function handleNoteSaved(updatedNote) {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );

      return [...updatedNotes].sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
    });
  }

  async function handleCreateNew() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/api/folders/${folderId}/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: "Untitled Note",
            content: "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const createdNote = await response.json();

      setCurrentNote(createdNote);
      setNotes((prevNotes) => [createdNote, ...prevNotes]);
    } catch (err) {
      console.error(err);
    }
  }

  function handleSelectNote(note) {
    setCurrentNote(note);
    setToggleOptions("");
  }

  if (toggleOptions === "") {
    return (
      <PaperSheet
        modes={mode}
        folderId={folderId}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        onNoteSaved={handleNoteSaved}
      />
    );
  }

  if (toggleOptions === "folders") {
    return (
      <OpenFolder
        modes={mode}
        notes={notes}
        currentNote={currentNote}
        onCreateNew={handleCreateNew}
        onSelectNote={handleSelectNote}
      />
    );
  }

  if (toggleOptions === "modes") {
    return (
      <OpenModes
        modes={mode}
        folderId={folderId}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        onNoteSaved={handleNoteSaved}
      />
    );
  }

  return null;
}