


function FolderCapsule(){
    return (
        <div className="flex justify-center p-2 items-center
        border-[2px] rounded-full border-black text-lg
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">FolderName</div>


    )
}

export default function FolderShelf(){

    return (
        <div className="px-5 w-3/6 max-w-8xl mt-3">
            <p className="text-lg font-bold">Folders</p>
            <div id="folderGrid" className="mx-5 py-2 grid grid-cols-2 gap-4
             overflow-hidden overflow-y-auto px-6 custom-scroll
            h-2/3">
                <button className="flex justify-center p-2 border-[2px] rounded-full border-black text-xl font-bold
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