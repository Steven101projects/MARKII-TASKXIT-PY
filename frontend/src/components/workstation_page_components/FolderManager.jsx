import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FolderCapsule({ folder, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(folder)}
      title={folder.name}
      className="
        group relative
        flex items-center
        w-full
        py-4 px-6
        border-[2px] rounded-full border-black text-lg
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
      const response = await axios.get("http://127.0.0.1:8000/api/folders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  return (
    <div className="px-5 w-3/6 max-w-8xl mt-3">
      <p className="text-lg font-bold">Folders</p>

      <div
        id="folderGrid"
        className="
          mx-5 py-2 px-6 pb-16
          grid grid-cols-2 gap-4
          overflow-y-auto overflow-x-hidden
          custom-scroll max-h-[30vh]
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
            />
          ))
        )}
      </div>
    </div>
  );
}