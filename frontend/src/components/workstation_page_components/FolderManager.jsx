import { useEffect, useState } from "react";
import axios from "axios";

function FolderCapsule({ folder, onClick }) {
  return (
    <button
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
  const [creating, setCreating] = useState(false);

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

  async function handleCreateFolder() {
    const folderName = prompt("Enter folder name:");

    if (!folderName || !folderName.trim()) return;

    try {
      setCreating(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/folders/",
        { name: folderName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFolders((prevFolders) => [response.data, ...prevFolders]);
    } catch (error) {
      console.error("Failed to create folder:", error);
    } finally {
      setCreating(false);
    }
  }

  function handleFolderClick(folder) {
    console.log("Selected folder:", folder);
  }

  return (
    <div className="px-5 w-3/6 max-w-8xl mt-3">
      <p className="text-lg font-bold">Folders</p>

      <div
        id="folderGrid"
        className="mx-5 py-2 grid grid-cols-2 gap-4
        overflow-hidden overflow-y-auto px-6 custom-scroll h-2/3"
      >
        <button
          onClick={handleCreateFolder}
          disabled={creating}
          className="flex justify-center p-2 border-[2px] rounded-full border-black text-xl font-bold
          hover:scale-105 transition-transform bg-[#eeeced] cursor-pointer items-center h-16
          hover:border-gray-300 disabled:opacity-50"
        >
          {creating ? "..." : "+"}
        </button>

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