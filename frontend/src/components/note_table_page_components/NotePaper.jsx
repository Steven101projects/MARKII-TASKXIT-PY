import { useState, useEffect, useRef } from "react";
import API from "../../api/index.js";

function NoteCard({
  folderId,
  currentNote,
  setCurrentNote,
  onNoteSaved,
}) {
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
      const response = await API.put(
        `/api/notes/${currentNote.id}`,
        {
          title: newTitle.trim(),
          content: newContent,
        }
      );

      const updatedNote = response.data;

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
      className="
        w-[50%]
        h-[110vh]
        m-8
        border-[#ffbd59]
        border-2
        rounded-2xl
        bg-white
        p-4
        transform
        translate-y-0
        hover:-translate-y-8
        transition-transform
        duration-300
      "
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="
          w-full
          font-bold
          text-3xl
          mb-2
          outline-none
          placeholder:text-black
        "
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your note here..."
        className="
          w-full
          h-[85%]
          text-2xl
          placeholder:text-gray-600
          outline-none
          resize-none
        "
      />

      {error && (
        <p className="text-sm text-red-600 mb-2">
          {error}
        </p>
      )}

      {saveStatus && (
        <p className="text-sm text-gray-500">
          {saveStatus}
        </p>
      )}
    </div>
  );
}

function MobileNoteCard({
  folderId,
  currentNote,
  setCurrentNote,
  onNoteSaved,
}) {
  return (
    <NoteCard
      folderId={folderId}
      currentNote={currentNote}
      setCurrentNote={setCurrentNote}
      onNoteSaved={onNoteSaved}
    />
  );
}

function PaperSheet({
  modes,
  folderId,
  currentNote,
  setCurrentNote,
  onNoteSaved,
}) {
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
      const response = await API.get(
        `/api/folders/${folderId}/notes`
      );

      const data = response.data;

      const sortedNotes = [...data].sort(
        (a, b) =>
          new Date(a.created_at) -
          new Date(b.created_at)
      );

      setNotes(sortedNotes);
    } catch (err) {
      console.error(err);
    }
  }

  function handleNoteSaved(updatedNote) {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === updatedNote.id
          ? updatedNote
          : note
      );

      return [...updatedNotes].sort(
        (a, b) =>
          new Date(b.updated_at) -
          new Date(a.updated_at)
      );
    });
  }

  async function handleCreateNew() {
    try {
      const response = await API.post(
        `/api/folders/${folderId}/notes`,
        {
          title: "Untitled Note",
          content: "",
        }
      );

      const createdNote = response.data;

      setCurrentNote(createdNote);

      setNotes((prevNotes) => [
        createdNote,
        ...prevNotes,
      ]);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteNote(note) {
    try {
      await API.delete(`/api/notes/${note.id}`);

      if (
        currentNote &&
        currentNote.id === note.id
      ) {
        setCurrentNote(null);
      }

      await fetchNotes();
    } catch (error) {
      console.error(
        "Failed to delete note:",
        error
      );
    }
  }

  function handleSelectNote(note) {
    setCurrentNote(note);
    setToggleOptions("");
  }

  return (
    <div>
      <button
        onClick={handleCreateNew}
        className="
          bg-blue-500
          text-white
          px-4
          py-2
          rounded
          mb-4
        "
      >
        Create Note
      </button>

      <div className="flex gap-4 flex-wrap">
        {notes.map((note) => (
          <div
            key={note.id}
            className="
              border
              p-4
              rounded
              cursor-pointer
              w-64
            "
            onClick={() =>
              handleSelectNote(note)
            }
          >
            <h2 className="font-bold text-xl">
              {note.title}
            </h2>

            <p className="text-gray-600 truncate">
              {note.content || "Empty note"}
            </p>

            <button
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteNote(note);
              }}
              className="
                mt-4
                text-red-500
              "
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {(toggleOptions === "" ||
        toggleOptions === "editor") && (
        <PaperSheet
          modes={mode}
          folderId={folderId}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          onNoteSaved={handleNoteSaved}
        />
      )}
    </div>
  );
}