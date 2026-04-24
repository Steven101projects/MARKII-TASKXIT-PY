import { useNavigate } from "react-router-dom";


export default function AddANote(){

  const navigate = useNavigate();

    return (
        <div  onClick={() => navigate('/addnote')}
         className="relative mt-5
         w-96 h-96 lg:w-2/6 max-w-5xl lg:h-[44vh] border-[#ffbd59] border-2 rounded-t-2xl bg-white
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300 cursor-pointer">
            <div className="flex items-center text-2xl">
      <img
        src="/addanotebutton.svg"
        alt="Logo"
        className="w-16 m-3 "
      />  
      <p>Add a note...</p>
            </div>
        </div>
    )
}

