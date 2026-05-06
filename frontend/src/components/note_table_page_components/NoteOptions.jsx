import { useState } from "react";

export default function NoteOptions({
  mode,
  option,
  toggleLeft,
  folderId,
  setFolderId,
  folders = [],
  setFolders,
}) {
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [error, setError] = useState("");

  const currentFolder = folders.find((folder) => folder.id === Number(folderId));

  async function handleCreateFolder() {
    try {
      setError("");

      if (!newFolderName.trim()) {
        setError("Please enter a folder name.");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/folders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newFolderName.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create folder");
      }

      const createdFolder = await response.json();

      setFolders((prevFolders) => [...prevFolders, createdFolder]);
      setFolderId(createdFolder.id);

      setNewFolderName("");
      setShowCreateFolderModal(false);
    } catch (err) {
      console.error(err);
      setError("Could not create folder.");
    }
  }

  function FolderCapsule({ folder }) {
    return (
      <div
        onClick={() => setFolderId(folder.id)}
        title={folder.name}
        className="
          group relative
          flex items-center
          p-4
          border-[2px] rounded-full border-black text-lg bg-white
          hover:scale-105 hover:border-gray-300
          transition-transform cursor-pointer
          overflow-hidden
          whitespace-nowrap
        "
      >
        <span
          className="
            folder-slide-text
            block
            w-max
            whitespace-nowrap
          "
        >
          {folder.name}
        </span>
      </div>
    );
  }

  function CurrentFolderCapsule() {
    const folderName = currentFolder ? currentFolder.name : "Current Folder";

    return (
      <div
        title={folderName}
        className="
          group relative
          flex items-center
          p-2 w-44
          border-[2px] rounded-full px-3 text-lg bg-white border-[#ffbd59]
          overflow-hidden
          whitespace-nowrap
        "
      >
        <span
          className="
            folder-slide-text
            block
            w-max
            whitespace-nowrap
          "
        >
          {folderName}
        </span>
      </div>
    );
  }

  function FolderButtons() {
    return (
      <div className="flex justify-center gap-4 pt-8">
        <div
          onClick={() => toggleLeft("modes")}
          className="flex justify-center p-2 items-center px-12
          border-[2px] rounded-lg border-black text-lg bg-white
          hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer"
        >
          Modes
        </div>

        <div
          onClick={() => toggleLeft("folders")}
          className="flex justify-center p-2 items-center px-12
          border-[2px] rounded-lg border-black text-lg bg-white
          hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer"
        >
          Folders
        </div>
      </div>
    );
  }

  function CreateFolderModal() {
    if (!showCreateFolderModal) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center px-4">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Create Folder</h2>

          <p className="text-sm text-gray-500 mb-4">
            Add a new folder for your notes.
          </p>

          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none mb-5"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setShowCreateFolderModal(false);
                setNewFolderName("");
                setError("");
              }}
              className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleCreateFolder}
              className="px-5 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-700"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }

  function FoldersKeys() {
    if (mode === "mobile") {
      return (
        <>
          <FolderButtons />
          <CreateFolderModal />
        </>
      );
    }

    return (
      <>
        <div className="pt-8 w-[50%] h-screen">
          <div
            id="folderGrid"
            className="
              mx-5 py-2 px-6
              grid grid-cols-2 gap-4
              max-h-[30vh]
              overflow-y-auto overflow-x-hidden
              custom-scroll
              pr-3
            "
          >
            {folders.map((folder) => (
              <FolderCapsule key={folder.id} folder={folder} />
            ))}

            <button
              type="button"
              onClick={() => setShowCreateFolderModal(true)}
              className="flex justify-center p-4 border-[2px] rounded-full border-black text-xl font-bold
              hover:scale-105 transition-transform bg-[#eeeced] cursor-pointer
              hover:border-gray-300"
            >
              +
            </button>
          </div>

          <div className="flex flex-col items-center pt-24 gap-2 h-[60%]">
            <div
              onClick={() => toggleLeft("modes")}
              className="flex justify-center p-2 items-center
              border-[2px] rounded-lg border-black text-lg bg-white w-[70%]
              hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer"
            >
              Modes
            </div>

            <div
              onClick={() => toggleLeft("folders")}
              className="flex justify-center p-2 items-center
              border-[2px] rounded-lg border-black text-lg bg-white w-[70%]
              hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer"
            >
              Folders
            </div>
          </div>
        </div>

        <CreateFolderModal />
      </>
    );
  }

  function TwoKeys() {
    if (mode === "mobile") {
      return <FolderButtons />;
    }

    return (
      <div className="pt-8 w-[50%] h-screen">
        <CurrentFolderCapsule />

        <div className="flex flex-col items-center justify-center gap-2 h-[60%]">
          <div
            onClick={() => toggleLeft("modes")}
            className="flex justify-center p-2 items-center
            border-[2px] rounded-lg border-black text-lg bg-white w-[70%]
            hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer"
          >
            Modes
          </div>

          <div
            onClick={() => toggleLeft("folders")}
            className="flex justify-center p-2 items-center
            border-[2px] rounded-lg border-black text-lg bg-white w-[70%]
            hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer"
          >
            Folders
          </div>
        </div>
      </div>
    );
  }

  function ModesKeys() {
    if (mode === "mobile") {
      return <FolderButtons />;
    }

    return (
      <div className="pt-8 w-[50%] h-screen">
        <CurrentFolderCapsule />

        <div className="flex flex-col items-center justify-center gap-2 h-[40%]">
          <div id="otherPapers" className="flex gap-12 text-white font-bold m-4 mb-16">
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

          <div
            onClick={() => toggleLeft("modes")}
            className="flex justify-center p-2 items-center
            border-[2px] rounded-lg border-black text-lg bg-white w-[70%]
            hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer"
          >
            Modes
          </div>

          <div
            onClick={() => toggleLeft("folders")}
            className="flex justify-center p-2 items-center
            border-[2px] rounded-lg border-black text-lg bg-white w-[70%]
            hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer"
          >
            Folders
          </div>
        </div>
      </div>
    );
  }

  if (option === "folders") {
    return <FoldersKeys />;
  }

  if (option === "modes") {
    return <ModesKeys />;
  }

  return <TwoKeys />;
}