import { useState, useEffect } from "react";

function NoteCard({ folderId, onNoteCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  async function handleSaveNote() {
    try {
      setError("");

      if (!folderId) {
        setError("Please select a folder first.");
        return;
      }

      if (!title.trim()) {
        setError("Please enter a title.");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          folder_id: Number(folderId),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const createdNote = await response.json();

      setTitle("");
      setContent("");

      if (onNoteCreated) {
        onNoteCreated(createdNote);
      }
    } catch (err) {
      setError("Could not save note.");
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

      {error && (
        <p className="text-sm text-red-600 mb-2">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSaveNote}
        className="px-5 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-700"
      >
        Save Note
      </button>
    </div>
  );
}

function MobileNoteCard({ folderId, onNoteCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  async function handleSaveNote() {
    try {
      setError("");

      if (!folderId) {
        setError("Please select a folder first.");
        return;
      }

      if (!title.trim()) {
        setError("Please enter a title.");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          folder_id: Number(folderId),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const createdNote = await response.json();

      setTitle("");
      setContent("");

      if (onNoteCreated) {
        onNoteCreated(createdNote);
      }
    } catch (err) {
      setError("Could not save note.");
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
        className="flex-1 w-full text-2xl placeholder:text-gray-600 bg-transparent outline-none resize-none "
      />

      {error && (
        <p className="text-sm text-red-600 mb-2">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSaveNote}
        className="px-5 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-700"
      >
        Save Note
      </button>
    </div>
  );
}

function PaperSheet({ modes, folderId, onNoteCreated }) {
  if (modes === "mobile") {
    return (
      <MobileNoteCard
        folderId={folderId}
        onNoteCreated={onNoteCreated}
      />
    );
  } else {
    return (
      <NoteCard
        folderId={folderId}
        onNoteCreated={onNoteCreated}
      />
    );
  }
}

function OpenFolder({ modes, notes, onCreateNew }) {
  function SmallPapers({ note }) {
    if (modes === "mobile") {
      return (
        <div
          className="h-[30vh] mx-8 my-2 border-[#ffbd59] border-2 rounded-2xl bg-white
         p-4 
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300"
        >
          <div id="title" className=" font-bold text-xl mb-2">
            <p>{note.title}</p>
          </div>
          <div id="content" className="text-lg">
            <p className="text-gray-600">{note.content}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="h-[40vh] mx-8 my-4 border-[#ffbd59] border-2 rounded-2xl bg-white
         p-4 
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300"
        >
          <div id="title" className=" font-bold text-2xl mb-2">
            <p>{note.title}</p>
          </div>
          <div id="content" className="text-xl">
            <p className="text-gray-600">{note.content}</p>
          </div>
        </div>
      );
    }
  }

  if (modes === "mobile") {
    return (
      <div className="pt-12 w-full h-[83vh] overflow-hidden overflow-y-auto grid grid-cols-2 gap-2 custom-scroll ml-2 relative">
        {notes.map((note) => (
          <SmallPapers key={note.id} note={note} />
        ))}

        <div
          onClick={onCreateNew}
          className=" mx-8 my-4 border-gray-500 border-2 rounded-2xl bg-[#e3e3e3] text-gray-500
         p-4 flex justify-center items-center cursor-pointer
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300"
        >
          <div id="title" className=" font-bold text-8xl mb-2">
            <p>+</p>
          </div>
        </div>
      </div>
    );
  } else {
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
          <div id="title" className=" font-bold text-8xl mb-2">
            <p>+</p>
          </div>
        </div>
      </div>
    );
  }
}

function OpenModes({ modes }) {
  if (modes === "mobile") {
    return (
      <div className="text-center ">
        <p className="font-bold text-white text-3xl mb-10">Modes</p>
        <div id="otherPapers" className="flex gap-12 text-white font-bold m-4 mb-16 justify-center">
          <div className="text-center hover:scale-110 transition-transform cursor-pointer">
            <img
              src="/note-svgrepo-com.svg"
              alt="Notes"
              className="w-32 invert "
            />
            <p className="text-2xl mt-4">Notes</p>
          </div>

          <div className="text-center hover:scale-110 transition-transform cursor-pointer">
            <img
              src="/list-check-svgrepo-com.svg"
              alt="Checklist"
              className="w-32 invert "
            />
            <p className="text-2xl mt-4">Checklist</p>
          </div>

          <div className="text-center hover:scale-110 transition-transform cursor-pointer">
            <img
              src="/notes-note-svgrepo-com.svg"
              alt="Numbered List"
              className="w-32 invert"
            />
            <p className="text-xl mt-5">Numbered List</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <PaperSheet />;
  }
}

export default function NotePaper({ mode, toggleOptions, folderId }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (folderId) {
      fetchNotes();
    }
  }, [folderId]);

  async function fetchNotes() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/api/notes/folder/${folderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load notes");
      }

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.log("Could not load notes.");
    }
  }

  function handleNoteCreated(newNote) {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  }

  function handleCreateNew() {
    console.log("Create new note inside folder:", folderId);
  }

  if (toggleOptions === "") {
    return (
      <PaperSheet
        modes={mode}
        folderId={folderId}
        onNoteCreated={handleNoteCreated}
      />
    );
  } else if (toggleOptions === "folders") {
    return (
      <OpenFolder
        modes={mode}
        notes={notes}
        onCreateNew={handleCreateNew}
      />
    );
  } else if (toggleOptions === "modes") {
    return <OpenModes modes={mode} />;
  }
}