import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainHeader from "../components/MainHeader";

import NotePaper from "../components/note_table_page_components/NotePaper";
import NoteOptions from "../components/note_table_page_components/NoteOptions";

import useIsMobile from "../hooks/useIsMobile";

import API from "../api/API.js";

export default function NoteTable() {

    const [option, setOption] = useState("");

    const [showFolderModal, setShowFolderModal] =
        useState(true);

    const [selectedFolderId, setSelectedFolderId] =
        useState(null);

    const [currentNote, setCurrentNote] =
        useState(null);

    const [folders, setFolders] =
        useState([]);

    const isMobile = useIsMobile();

    const navigate = useNavigate();

    async function handleFolderReady(folderId) {

        try {

            setSelectedFolderId(folderId);

            setShowFolderModal(false);

            setOption("");

            const response = await API.post(
                `/api/folders/${folderId}/notes`,
                {
                    title: "Untitled Note",
                    content: "",
                }
            );

            const createdNote = response.data;

            setCurrentNote(createdNote);

            console.log(
                "New note created for folder:",
                folderId
            );

        } catch (err) {

            console.error(err);

            if (err.response?.status === 401) {

                localStorage.removeItem("token");

                navigate("/");
            }
        }
    }

    return (

        <div className="overflow-hidden h-screen">

            <MainHeader />

            <div
                className="
                    absolute
                    top-0
                    w-full
                    inset-0
                    -z-10
                    bg-primary
                    h-[60%]
                "
            ></div>

            <NewNote
                showModal={showFolderModal}
                setShowModal={setShowFolderModal}
                onFolderReady={handleFolderReady}
                folders={folders}
                setFolders={setFolders}
            />

            <div className={isMobile ? "" : "flex"}>

                <NotePaper
                    mode={
                        isMobile
                            ? "mobile"
                            : "desktop"
                    }

                    toggleOptions={option}

                    setToggleOptions={setOption}

                    folderId={selectedFolderId}

                    currentNote={currentNote}

                    setCurrentNote={setCurrentNote}
                />

                <NoteOptions
                    mode={
                        isMobile
                            ? "mobile"
                            : "desktop"
                    }

                    toggleLeft={setOption}

                    option={option}

                    folderId={selectedFolderId}

                    setFolderId={setSelectedFolderId}

                    folders={folders}

                    setFolders={setFolders}
                />

            </div>

        </div>
    );
}

function NewNote({
    showModal,
    setShowModal,
    onFolderReady,
    folders,
    setFolders,
}) {

    const navigate = useNavigate();

    const [selectedFolder, setSelectedFolder] =
        useState("");

    const [newFolderName, setNewFolderName] =
        useState("");

    const [folderOption, setFolderOption] =
        useState("selectFolder");

    const [error, setError] =
        useState("");

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

            const response = await API.get(
                "/api/folders/"
            );

            setFolders(response.data);

        } catch (err) {

            console.error(err);

            setError(
                "Could not load folders."
            );

            if (err.response?.status === 401) {

                localStorage.removeItem("token");

                navigate("/");
            }
        }
    }

    async function handleCreateFolder() {

        try {

            setError("");

            if (!newFolderName.trim()) {

                setError(
                    "Please enter a folder name."
                );

                return;
            }

            const response = await API.post(
                "/api/folders/",
                {
                    name: newFolderName.trim(),
                }
            );

            const createdFolder =
                response.data;

            setFolders((prevFolders) => [
                ...prevFolders,
                createdFolder,
            ]);

            onFolderReady(createdFolder.id);

        } catch (err) {

            console.error(err);

            setError(
                "Could not create folder."
            );

            if (err.response?.status === 401) {

                localStorage.removeItem("token");

                navigate("/");
            }
        }
    }

    function handleContinue() {

        setError("");

        if (!selectedFolder) {

            setError(
                "Please select a folder."
            );

            return;
        }

        onFolderReady(selectedFolder);
    }

    if (!showModal) return null;

    return (

        <div
            className="
                fixed
                inset-0
                backdrop-blur-md
                bg-black/10
                z-50
                flex
                items-center
                justify-center
                px-4
            "
        >

            <div
                className="
                    bg-white
                    w-full
                    max-w-2xl
                    rounded-2xl
                    shadow-2xl
                    p-6
                "
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                <h2
                    className="
                        text-2xl
                        font-semibold
                        text-gray-900
                    "
                >
                    Add a New Note
                </h2>

                <p
                    className="
                        text-sm
                        text-gray-500
                        mt-1
                        mb-5
                    "
                >
                    Choose a folder first.
                    The note editor will use
                    this folder.
                </p>

                <hr className="mb-4" />

                {error && (

                    <p
                        className="
                            mb-4
                            text-sm
                            text-red-600
                        "
                    >
                        {error}
                    </p>

                )}

                {folderOption ===
                    "selectFolder" && (

                    <div>

                        <div className="mb-5">

                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                "
                            >
                                Folder
                            </label>

                            <select
                                value={
                                    selectedFolder
                                }
                                onChange={(e) =>
                                    setSelectedFolder(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    bg-white
                                    outline-none
                                    focus:ring-2
                                    focus:ring-gray-400
                                "
                            >

                                <option value="">
                                    Select a folder
                                </option>

                                {folders.map(
                                    (folder) => (

                                        <option
                                            key={
                                                folder.id
                                            }
                                            value={
                                                folder.id
                                            }
                                        >
                                            {
                                                folder.name
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setFolderOption(
                                    "newFolder"
                                )
                            }
                            className="
                                px-5
                                py-2
                                rounded-xl
                                border
                                border-black
                                text-black
                                hover:border-blue-500
                                hover:text-blue-600
                            "
                        >
                            Create a new folder
                        </button>

                    </div>

                )}

                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        mt-6
                    "
                >

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/ws")
                        }
                        className="
                            px-5
                            py-2
                            rounded-xl
                            border
                            border-gray-300
                            text-gray-700
                            hover:bg-gray-100
                        "
                    >
                        Cancel
                    </button>

                    {folderOption ===
                    "selectFolder" ? (

                        <button
                            type="button"
                            onClick={
                                handleContinue
                            }
                            className="
                                px-5
                                py-2
                                rounded-xl
                                bg-gray-900
                                text-white
                                hover:bg-gray-700
                            "
                        >
                            Continue
                        </button>

                    ) : (

                        <button
                            type="button"
                            onClick={
                                handleCreateFolder
                            }
                            className="
                                px-5
                                py-2
                                rounded-xl
                                bg-gray-900
                                text-white
                                hover:bg-gray-700
                            "
                        >
                            Create Folder
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
}