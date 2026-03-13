


function ModesKeys(mode){

}

function FoldersKeys(mode){

    
function FolderCapsule(){
    return (
        <div className="flex justify-center p-2 items-center
        border-[2px] rounded-full border-black text-lg bg-white
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">FolderName</div>
    )
}
    
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
        <div className="pt-8 w-[50%] h-screen">
<div id="folderGrid" className="mx-5 py-2 grid grid-cols-2 gap-4 h-[30%]
             overflow-hidden overflow-y-auto px-6 custom-scroll ">
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                
                <button className="flex justify-center p-2 border-[2px] rounded-full border-black text-xl font-bold
                hover:scale-105 transition-transform bg-[#eeeced] cursor-pointer
                hover:border-gray-300">+</button>
            </div>

        <div className="flex flex-col items-center pt-24 gap-2 h-[60%]">
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

export default function NoteOptions({mode, option, toggleLeft}){

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
        <div className="pt-8 w-[50%] h-screen">
        <div className="flex justify-center p-2 items-center w-44
        border-[2px] rounded-full px-3 text-lg bg-white border-[#ffbd59] 
        ">Current Folder
        </div>


        <div className="flex flex-col items-center justify-center gap-2 h-[60%]">
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
 if(option === "folders"){
    
    return (
        <>
           <FoldersKeys mode={mode} />
        </>
    )
 } else {
    return (
        <>
           <TwoKeys mode={mode}/>
        </>
    )
 }


}