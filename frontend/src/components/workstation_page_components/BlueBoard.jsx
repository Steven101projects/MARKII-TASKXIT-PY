import BoardNote from "./BoardNote"

import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}

function SideNotes({ className, text }){
    return (
        <div
        className={`w-48 ${className} cursor-pointer
         border-[#ffbd59] border-2 bg-white h-[50vh]`}>
            <p className="p-2 text-sm">{text ? text : "Reminders..."}</p>
        </div>
    )
}

function MobileSideNotes(){
    return (
        <div className="flex justify-between w-[90vw] h-12 mb-4">
            <button className="bg-white border-2 border-black rounded-full
            p-2 w-1/2 mx-2 hover:scale-105 transition-transform">Reminders</button>
            <button className="bg-white border-2 border-black rounded-full
            p-2 w-1/2 mx-2 hover:scale-105 transition-transform">None</button>
        </div>
    )
}

export default function BlueBoard(){
    const isMobile = useIsMobile();

    const desktopView = (
        <div 
        className="w-full h-[55vh] bg-primary
        flex justify-center pt-4">
            <SideNotes className="absolute -left-9 rounded-e-xl text-right pr-4
            transform translate-x-0 hover:translate-x-4 transition-transform duration-300"/>
            <BoardNote />
            <SideNotes className="absolute right-0 rounded-s-xl hover:w-56
            transition-all duration-300"
            text="Add a pinned note here..."/>
        </div>
    )

    const mobileView = (
                <div 
        className="w-full h-[59vh] bg-primary
        flex flex-col items-center">
            <BoardNote />
            <MobileSideNotes />
        </div>
    )
    

    return(
<div>
    {isMobile ? mobileView : desktopView}
</div>
    )
}