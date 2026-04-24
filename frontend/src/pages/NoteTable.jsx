import { useState, useEffect } from "react";
import MainHeader from "../components/MainHeader";
import NotePaper from "../components/note_table_page_components/NotePaper";
import NoteOptions from "../components/note_table_page_components/NoteOptions";
import { useNavigate } from "react-router-dom";

import useIsMobile from "../hooks/useIsMobile";

export default function NoteTable() {
    const [option, setOption] = useState("");
    const [showFolderModal, setShowFolderModal] = useState(true);
    const [selectedFolderId, setSelectedFolderId] = useState(null);

    const isMobile = useIsMobile();

    function handleFolderReady(folderId) {
        setSelectedFolderId(folderId);
        setShowFolderModal(false);

        console.log("Folder selected for note:", folderId);
    }

    return (
        <div className="overflow-hidden h-screen">
            <MainHeader />

            <div className="absolute top-0 w-full inset-0 -z-10 bg-primary h-[60%]"></div>

            <NewNote
                showModal={showFolderModal}
                setShowModal={setShowFolderModal}
                onFolderReady={handleFolderReady}
            />

            <div className={isMobile ? "" : "flex"}>
                <NotePaper
                    mode={isMobile ? "mobile" : "desktop"}
                    toggleOptions={option}
                    folderId={selectedFolderId}
                />

                <NoteOptions
                    mode={isMobile ? "mobile" : "desktop"}
                    toggleLeft={setOption}
                    option={option}
                    folderId={selectedFolderId}
                />
            </div>
        </div>
    );
}

function NewNote({ showModal, setShowModal, onFolderReady }) {

    const navigate = useNavigate();

    //stores the current folders available
    const [folders, setFolders] = useState([]);

    //Stores the chosen folder
    const [selectedFolder, setSelectedFolder] = useState("");

    //input for new folder
    const [newFolderName, setNewFolderName] = useState("");
    //Either Select Folder or Create Folder
    const [folderOption, setFolderOption] = useState("selectFolder");
    const [error, setError] = useState("");

    useEffect(() => {
        if (showModal) {
            fetchFolders();
            setSelectedFolder("");
            setNewFolderName("");
            setFolderOption("selectFolder");
            setError("");
        }
    }, [showModal]);

    async function fetchFolders() {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://127.0.0.1:8000/api/folders/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to load folders");
            }

            const data = await response.json();
            setFolders(data);
        } catch (err) {
            setError("Could not load folders.");
        }
    }

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

            onFolderReady(createdFolder.id);
        } catch (err) {
            setError("Could not create folder.");
        }
    }

    function handleContinue() {
        setError("");

        if (!selectedFolder) {
            setError("Please select a folder.");
            return;
        }

        onFolderReady(Number(selectedFolder));
    }

    if (!showModal) return null;

    return (
        <div
            className="fixed inset-0 backdrop-blur-md bg-black/10 z-50 flex items-center justify-center px-4"
        >
            <div
                className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-semibold text-gray-900">
                    Add a New Note
                </h2>

                <p className="text-sm text-gray-500 mt-1 mb-5">
                    Choose a folder first. The note editor will use this folder. (This is the beta version)
                </p>

                <hr className="mb-4" />

                {error && (
                    <p className="mb-4 text-sm text-red-600">
                        {error}
                    </p>
                )}

                {folderOption === "selectFolder" && (
                    <div>
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Folder
                            </label>

                            <select
                                value={selectedFolder}
                                onChange={(e) => setSelectedFolder(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <option value="">Select a folder</option>

                                {folders.map((folder) => (
                                    <option key={folder.id} value={folder.id}>
                                        {folder.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={() => setFolderOption("newFolder")}
                            className="px-5 py-2 rounded-xl border border-blue-700 text-black hover:bg-gray-100"
                        >
                            Create a new folder
                        </button>
                    </div>
                )}

                {folderOption === "newFolder" && (
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Folder
                        </label>

                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="Enter folder name"
                            className="w-full border mb-5 border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-400"
                        />

                        <button
                            type="button"
                            onClick={() => setFolderOption("selectFolder")}
                            className="px-7 py-2 rounded-xl border border-gray-700 text-black hover:bg-gray-100"
                        >
                            Go back
                        </button>
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate("/ws")}
                        className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    {folderOption === "selectFolder" ? (
                        <button
                            type="button"
                            onClick={handleContinue}
                            className="px-5 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-700"
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleCreateFolder}
                            className="px-5 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-700"
                        >
                            Create Folder
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}