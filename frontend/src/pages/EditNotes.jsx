import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainHeader from "../components/MainHeader";

import NotePaper from "../components/note_table_page_components/NotePaper";
import NoteOptions from "../components/note_table_page_components/NoteOptions";

import useIsMobile from "../hooks/useIsMobile";

import API from "../api/API.js";

export default function EditNoteTable() {

    const { folderId } = useParams();

    const navigate = useNavigate();

    const isMobile = useIsMobile();

    /*
      VIEW STATES

      folders
      notes
      editor
      modes
    */

    const [option, setOption] = useState("folders");

    /*
      Current selected folder
    */

    const [selectedFolderId, setSelectedFolderId] =
        useState(folderId || null);

    /*
      Current opened note
    */

    const [currentNote, setCurrentNote] =
        useState(null);

    /*
      Folder list
    */

    const [folders, setFolders] = useState([]);

    /*
      Initial folder fetch
    */

    useEffect(() => {

        fetchFolders();

    }, []);

    /*
      Sync URL with state

      /editnote
      /editnote/:folderId
    */

    useEffect(() => {

        /*
          Folder route exists
        */

        if (folderId) {

            setSelectedFolderId(folderId);

            /*
              Mobile:
              entering folder route
              should open notes screen
            */

            if (isMobile) {
                setOption("notes");
            }

            return;
        }

        /*
          No folder selected
        */

        setSelectedFolderId(null);

        setCurrentNote(null);

        setOption("folders");

    }, [folderId, isMobile]);

    /*
      Fetch folders
    */

    async function fetchFolders() {

        try {

            const response = await API.get(
                "/api/folders/"
            );

            setFolders(response.data);

        } catch (err) {

            console.error(err);

            /*
              Unauthorized
            */

            if (err.response?.status === 401) {

                localStorage.removeItem("token");

                navigate("/");
            }
        }
    }

    /*
      CENTRAL FOLDER CONTROLLER

      This synchronizes:
      NoteOptions
      NotePaper
      URL
      Mobile Navigation
    */

    function handleFolderChange(newFolderId) {

        /*
          Select folder
        */

        setSelectedFolderId(newFolderId);

        /*
          Reset opened note
        */

        setCurrentNote(null);

        /*
          Open notes browser
        */

        setOption("notes");

        /*
          Sync route
        */

        navigate(`/editnote/${newFolderId}`);
    }

    /*
      Open editor

      Used when:
      clicking small papers
    */

    function handleOpenEditor(note) {

        setCurrentNote(note);

        setOption("editor");
    }

    /*
      Return to folders

      Mobile navigation helper
    */

    function handleOpenFolders() {

        setCurrentNote(null);

        setOption("folders");

        navigate("/editnote");
    }

    return (

        <div className="overflow-hidden h-screen">

            <MainHeader />

            {/* Background */}

            <div
                className="
                    absolute
                    inset-0
                    top-0
                    w-full
                    h-[60%]
                    bg-primary
                    -z-10
                "
            ></div>

            {/* Main Layout */}

            <div className={isMobile ? "" : "flex"}>

                <NotePaper
                    mode={isMobile ? "mobile" : "desktop"}

                    /*
                      Current active screen
                    */

                    toggleOptions={option}
                    setToggleOptions={setOption}

                    /*
                      Current folder
                    */

                    folderId={selectedFolderId}

                    /*
                      Current note
                    */

                    currentNote={currentNote}
                    setCurrentNote={setCurrentNote}

                    /*
                      Navigation helpers
                    */

                    onOpenEditor={handleOpenEditor}
                />

                <NoteOptions
                    mode={isMobile ? "mobile" : "desktop"}

                    /*
                      Current active screen
                    */

                    option={option}

                    /*
                      Navigation controller
                    */

                    toggleLeft={setOption}

                    /*
                      Folder controller
                    */

                    setFolderId={handleFolderChange}

                    /*
                      Current folder
                    */

                    folderId={selectedFolderId}

                    /*
                      Folder data
                    */

                    folders={folders}
                    setFolders={setFolders}

                    /*
                      Mobile return helper
                    */

                    onOpenFolders={handleOpenFolders}
                />

            </div>

        </div>
    );
}