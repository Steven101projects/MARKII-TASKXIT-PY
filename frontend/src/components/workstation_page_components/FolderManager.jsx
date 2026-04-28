import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FolderCapsule({ folder, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(folder)}
      className="flex justify-center p-2 items-center
      border-[2px] rounded-full border-black text-lg h-16
      hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer"
    >
      {folder.name}
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
        className="mx-5 py-2 grid grid-cols-2 gap-4
        overflow-hidden overflow-y-auto px-6 custom-scroll h-2/3"
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