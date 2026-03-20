import { useState, useEffect } from "react"
import MainHeader from "../components/MainHeader"         
import NotePaper from "../components/note_table_page_components/NotePaper"
import NoteOptions from "../components/note_table_page_components/NoteOptions"


import useIsMobile from "../hooks/useIsMobile" 

export default function NoteTable(){
 const [option, setOption] = useState("");

        console.log(option)

 const isMobile = useIsMobile();

    return (
        <div className="overflow-hidden h-screen">
         <MainHeader />
        <div className="absolute top-0 w-full inset-0 -z-10 bg-primary h-[60%]"></div>
        <div className={isMobile ? "" : "flex"}>
        <NotePaper mode={isMobile ? "mobile" : "desktop"} toggleOptions={option}/>
        <NoteOptions mode={isMobile ? "mobile" : "desktop"} toggleLeft={setOption} option={option}/>
        </div>
        </div>
    )
}