import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainHeader from "../components/MainHeader";
import NotePaper from "../components/note_table_page_components/NotePaper";
import NoteOptions from "../components/note_table_page_components/NoteOptions";
import useIsMobile from "../hooks/useIsMobile";

export default function EditNoteTable() {
    const { folderId } = useParams();

    const [option, setOption] = useState("folders");
    const [selectedFolderId, setSelectedFolderId] = useState(Number(folderId));
    const [currentNote, setCurrentNote] = useState(null);
    const [folders, setFolders] = useState([]);

    const isMobile = useIsMobile();
    const navigate = useNavigate();

    useEffect(() => {
        fetchFolders();
    }, []);

    useEffect(() => {
        if (folderId) {
            setSelectedFolderId(Number(folderId));
            setOption("folders");
        }
    }, [folderId]);

    async function fetchFolders() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                localStorage.removeItem("token");
                navigate("/");
                return;
            }

            const response = await fetch("http://127.0.0.1:8000/api/folders/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/");
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to load folders");
            }

            const data = await response.json();
            setFolders(data);
        } catch (err) {
            console.error(err);
        }
    }

    function handleFolderChange(newFolderId) {
        setSelectedFolderId(newFolderId);
        setCurrentNote(null);
        setOption("folders");
        navigate(`/editnote/${newFolderId}`);
    }

    return (
        <div className="overflow-hidden h-screen">
            <MainHeader />

            <div className="absolute top-0 w-full inset-0 -z-10 bg-primary h-[60%]"></div>

            <div className={isMobile ? "" : "flex"}>
<NotePaper
  mode={isMobile ? "mobile" : "desktop"}
  toggleOptions={option}
  setToggleOptions={setOption}
  folderId={selectedFolderId}
  currentNote={currentNote}
  setCurrentNote={setCurrentNote}
/>

<NoteOptions
    mode={isMobile ? "mobile" : "desktop"}
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