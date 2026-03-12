

function ModesKeys(mode){

}

function FoldersKeys(mode){

}

export default function NoteOptions({mode, toggleLeft}){

function TwoKeys(){

    if(mode === "mobile"){
    return (

        <div className="">
        <div className="flex justify-center gap-4 pt-8">
        <div onClick={() => {toggleLeft("modes")}} className="flex justify-center p-2 items-center px-12
        border-[2px] rounded-lg border-black text-lg bg-white
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">Modes
        </div>

        <div onClick={() => {toggleLeft("folders")}}  className="flex justify-center p-2 items-center px-12
        border-[2px] rounded-lg border-black text-lg bg-white
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">Folders
        </div>

        </div>
        </div>
    )

    } else {
    return (
        <div className="pt-8 w-[50%]">
        <div className="flex justify-center p-2 items-center w-44
        border-[2px] rounded-full px-3 text-lg bg-white border-[#ffbd59] 
        ">Current Folder
        </div>


        <div className="flex flex-col items-center justify-center gap-2 h-[40%]">
        <div onClick={() => {toggleLeft("modes")}}  className=
        {`flex justify-center p-2 items-center
        border-[2px] rounded-lg border-black text-lg bg-white w-[70%]
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ` }>Modes
        </div>
        <div onClick={() => {toggleLeft("folders")}} className="flex justify-center p-2 items-center
        border-[2px] rounded-lg border-black text-lg bg-white w-[70%]
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">Folders
        </div>
        </div>

        </div>
    )
}
}

    return (
        <>
           <TwoKeys mode={mode}/>
        </>
    )
}