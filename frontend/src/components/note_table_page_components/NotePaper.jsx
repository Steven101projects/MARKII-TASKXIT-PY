
function PaperSheet({modes}){

    if(modes === "mobile"){
return (
        <div
        className="h-[70vh] m-4 mt-12 border-[#ffbd59] border-2 rounded-2xl bg-white
         p-4 
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300">
         <div id="title" className=" font-bold text-3xl mb-2"><p>Title</p></div>
         <div id="content" className="text-2xl"><p className="text-gray-600">Your note here...</p></div>
        </div>
    )
    } else if
    (modes === "desktop"){
 return (
        <div
        className="w-[50%] h-[110vh] m-8 border-[#ffbd59] border-2 rounded-2xl bg-white
         p-4 
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300">
         <div id="title" className=" font-bold text-3xl mb-2"><p>Title</p></div>
         <div id="content" className="text-2xl"><p className="text-gray-600">Your note here...</p></div>
        </div>
    )
} else {
 return (
        <div
        className="w-[50%] h-[110vh] m-8 border-[#ffbd59] border-2 rounded-2xl bg-white
         p-4 
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300">
         <div id="title" className=" font-bold text-3xl mb-2"><p>Title</p></div>
         <div id="content" className="text-2xl"><p className="text-gray-600">Your note here...</p></div>
        </div>
    )      
    }
}



export default function NotePaper({mode, toggleOptions}){

    if(toggleOptions === ""){
        return <PaperSheet modes={mode} />
    } else if (toggleOptions === "folders"){
        return <div>Folders</div>
    } else if (toggleOptions === "modes"){
        return  <div>Modes</div>
    }
}