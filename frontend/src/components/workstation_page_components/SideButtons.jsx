




export default function SideButtons(){
    return(
        <div className="flex flex-col w-44 h-full gap-6 ml-10 p-5 items-center justify-center">
            <button className="flex justify-center p-3 items-center
        border-[2px] rounded-full border-black w-48 text-2xl
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">Ai Bot</button>
            <button className="flex justify-center p-3 items-center
        border-[2px] rounded-full border-black w-48 text-2xl
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">Archive</button>
            <button className="flex justify-center p-3 items-center
        border-[2px] rounded-full border-black w-48 text-2xl
        hover:scale-105 hover:border-gray-300 transition-transform cursor-pointer
        ">...</button>
        </div>
    )
}