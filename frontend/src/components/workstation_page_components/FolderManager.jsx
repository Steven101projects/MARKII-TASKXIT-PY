


function FolderCapsule(){
    return (
        <div className="flex justify-center p-2 items-center
        border-[2px] rounded-full border-black w-80 text-xl
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">FolderName</div>


    )
}

export default function FolderShelf(){

    return (
        <div className="p-5">
            <p className="text-2xl font-bold">Folders</p>
            <div id="folderGrid" className="mx-5 my-2 grid grid-cols-2 gap-6
            h-[28vh] overflow-hidden overflow-y-auto px-6 custom-scroll
            ">
                <button className="flex justify-center p-2 border-[2px] rounded-full border-black w-80 text-2xl font-bold
                hover:scale-105 transition-transform bg-[#eeeced] cursor-pointer
                hover:border-gray-300">+</button>
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
                <FolderCapsule />
            </div>
        </div>
    )
}