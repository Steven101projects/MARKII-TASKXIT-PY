import { useState } from "react";

function NoteCard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div
      className="w-[50%] h-[110vh] m-8 border-[#ffbd59] border-2 rounded-2xl bg-white p-4
      transform translate-y-0 hover:-translate-y-8 transition-transform duration-300"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full font-bold text-3xl mb-2 outline-none placeholder:text-black"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your note here..."
        className="w-full h-[95%] text-2xl placeholder:text-gray-600 outline-none resize-none"
      />
    </div>
  );
}

function MobileNoteCard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div
      className="h-[70vh] m-4 mt-12 border-[#ffbd59] border-2 rounded-2xl bg-white
      p-4 flex flex-col transform translate-y-0 hover:-translate-y-8 transition-transform duration-300"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full font-bold text-3xl mb-2 bg-transparent outline-none placeholder:text-black"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your note here..."
        className="flex-1 w-full text-2xl placeholder:text-gray-600 bg-transparent outline-none resize-none "
      />
    </div>
  );
}

function PaperSheet({modes}){

    if(modes === "mobile"){
return (
    <MobileNoteCard />
    )
    } else {
 return (
<NoteCard />
    )      
    }
}


function OpenFolder({modes}){

function SmallPapers(){

    if(modes === "mobile"){
 return (
        <div
        className="h-[30vh] mx-8 my-2 border-[#ffbd59] border-2 rounded-2xl bg-white
         p-4 
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300">
         <div id="title" className=" font-bold text-xl mb-2"><p>Title</p></div>
         <div id="content" className="text-lg"><p className="text-gray-600">Your note here...</p></div>
        </div> 
    )
    } else {
  return (
        <div
        className="h-[40vh] mx-8 my-4 border-[#ffbd59] border-2 rounded-2xl bg-white
         p-4 
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300">
         <div id="title" className=" font-bold text-2xl mb-2"><p>Title</p></div>
         <div id="content" className="text-xl"><p className="text-gray-600">Your note here...</p></div>
        </div> 
    )
    }
}
  
    if(modes === "mobile"){
return (
      
    <div className="pt-12 w-full h-[83vh] overflow-hidden overflow-y-auto grid grid-cols-2 gap-2 custom-scroll ml-2 relative">
        <SmallPapers />
        <SmallPapers />
        <SmallPapers />
        <SmallPapers />
        <SmallPapers /> 
        <SmallPapers />  
        <SmallPapers />   
                        
      <div
        className=" mx-8 my-4 border-gray-500 border-2 rounded-2xl bg-[#e3e3e3] text-gray-500
         p-4 flex justify-center items-center cursor-pointer
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300">
            <div id="title" className=" font-bold text-8xl mb-2"><p>+</p></div>
        </div> 
    </div>

    )
    } else {
 return (

    <div className="pt-4 w-[50%] h-[92vh] overflow-hidden overflow-y-auto grid grid-cols-3 gap-2 custom-scroll ml-2 relative">
    <SmallPapers />
        <SmallPapers />
        <SmallPapers />
        <SmallPapers />
        <SmallPapers /> 
         <SmallPapers />    
                        
      <div
        className="h-[40vh] mx-8 my-4 border-gray-500 border-2 rounded-2xl bg-[#e3e3e3] text-gray-500
         p-4 flex justify-center items-center cursor-pointer
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300">
            <div id="title" className=" font-bold text-8xl mb-2"><p>+</p></div>
        </div> 
    </div>

    )
}  
}

function OpenModes({modes}){
    
    if(modes === "mobile"){
return (
<div className="text-center ">
    <p className="font-bold text-white text-3xl mb-10">Modes</p>
    <div id="otherPapers" className="flex gap-12 text-white font-bold m-4 mb-16 justify-center">

    <div className="text-center hover:scale-110 transition-transform cursor-pointer">
      <img
        src="/note-svgrepo-com.svg"
        alt="Notes"
        className="w-32 invert "
      />
      <p className="text-2xl mt-4">Notes</p>
    </div>

    <div className="text-center hover:scale-110 transition-transform cursor-pointer">
      <img
        src="/list-check-svgrepo-com.svg"
        alt="Checklist"
        className="w-32 invert "
      />
      <p className="text-2xl mt-4">Checklist</p>
    </div>

    <div className="text-center hover:scale-110 transition-transform cursor-pointer">
      <img
        src="/notes-note-svgrepo-com.svg"
        alt="Numbered List"
        className="w-32 invert"
      />
      <p className="text-xl mt-5">Numbered List</p>
    </div>

  </div>  
</div>
    )
    } else {
 return (
<PaperSheet/>
    )      
    }
}


export default function NotePaper({mode, toggleOptions}){

    if(toggleOptions === ""){
        return <PaperSheet modes={mode} />
    } else if (toggleOptions === "folders"){
        return <OpenFolder modes={mode} />
    } else if (toggleOptions === "modes"){
        return  <OpenModes modes={mode}/>
    }
}