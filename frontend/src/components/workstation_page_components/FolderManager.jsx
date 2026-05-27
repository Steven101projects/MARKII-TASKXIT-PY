import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/API.js";

function FolderCapsule({
  folder,
  onClick,
  onEdit,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => onClick(folder)}
      title={folder.name}
      className="
  group relative
  flex items-center justify-between
  w-full
  py-4 px-6
  border-[2px] rounded-full border-black
  text-lg
  hover:scale-105 hover:border-gray-300
  transition-all duration-200
  cursor-pointer
  overflow-visible
  bg-white
  z-0
    hover:z-50
"
    >
      {/* Folder Name */}
      <span
        className="
          truncate
          pr-8
          text-left
          w-full
        "
      >
        {folder.name}
      </span>

      {/* Three Dots */}
      <div
        ref={menuRef}
        className="
          absolute right-4
          opacity-0
          group-hover:opacity-100
          transition-opacity
        "
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="
            w-8 h-8
            rounded-full
            hover:bg-gray-200
            flex items-center justify-center
            text-xl
          "
        >
          ⋯
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div
            className="
              absolute right-0 mt-2
              w-36
              bg-white
              border border-gray-300
              rounded-xl
              shadow-lg
              overflow-hidden
              z-50
            "
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setMenuOpen(false);
                onEdit(folder);
              }}
              className="
                w-full
                px-4 py-3
                text-left
                hover:bg-gray-100
              "
            >
              Edit Folder
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setMenuOpen(false);
                onDelete(folder);
              }}
              className="
                w-full
                px-4 py-3
                text-left
                text-red-500
                hover:bg-red-50
              "
            >
              Delete Folder
            </button>
          </div>
        )}
      </div>
    </button>
  );
}

export default function FolderShelf() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

async function fetchFolders() {
  try {
    const response = await API.get("/api/folders/");

    setFolders(response.data);
  } catch (error) {
    console.error("Failed to fetch folders:", error);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchFolders();
  }, []);

  function handleFolderClick(folder) {
    navigate(`/editnote/${folder.id}`);
  }

  async function handleEditFolder(folder) {
    const newName = prompt(
      "Enter new folder name:",
      folder.name
    );

    if (!newName || newName.trim() === "") return;

    try {
await API.put(
  `/api/folders/${folder.id}`,
        {
          name: newName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFolders();
    } catch (error) {
      console.error("Failed to edit folder:", error);
    }
  }

  async function handleDeleteFolder(folder) {
    const confirmed = window.confirm(
      `Delete "${folder.name}"?`
    );

    if (!confirmed) return;

    try {
     await API.delete(
  `/api/folders/${folder.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFolders();
    } catch (error) {
      console.error("Failed to delete folder:", error);
    }
  }

  return (
    <div className="px-5 w-3/6 max-w-8xl mt-3">
      <p className="text-lg font-bold">Folders</p>

<div
  id="folderGrid"
  className="
    mx-5 py-2 px-6 pb-16
    grid grid-cols-2 gap-4
    overflow-y-auto overflow-x-visible
    custom-scroll max-h-[30vh]
    relative
  "
>
        {loading ? (
          <p>Loading folders...</p>
        ) : folders.length === 0 ? (
          <p>No folders yet.</p>
        ) : (
          folders.map((folder) => (
            <FolderCapsule
              key={folder.id}
              folder={folder}
              onClick={handleFolderClick}
              onEdit={handleEditFolder}
              onDelete={handleDeleteFolder}
            />
          ))
        )}
      </div>
    </div>
  );
}