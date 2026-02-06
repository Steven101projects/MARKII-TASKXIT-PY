import PaperNote from "../ui/PaperNote"

import BoardNote from "./BoardNote"


export default function BlueBoard(){

    return(
        <div 
        className="w-full h-[50vh] bg-primary flex">
            {/* <PaperNote className="absolute" /> */}
            paper here
            <BoardNote />
            {/* <PaperNote className="absolute" /> */}
        </div>
    )
}