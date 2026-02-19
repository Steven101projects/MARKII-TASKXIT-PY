




export default function SideButtons(){
    return(
        <div className="flex flex-col w-1/4 pl-2 h-full gap-4 mt-4">
            <button className="flex justify-center py-2 items-center
        border-[2px] rounded-full border-black text-xl
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">Ai Bot</button>
            <button className="flex justify-center py-2 items-center
        border-[2px] rounded-full border-black text-xl
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">Archive</button>
            <button className="flex justify-center py-2 items-center
        border-[2px] rounded-full border-black text-xl
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">...</button>
        </div>
    )
}