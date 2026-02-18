



export default function AddANote(){

    return (
        <div className="relative
         w-96 h-96 lg:w-[550px] lg:h-[44vh] border-[#ffbd59] border-2 rounded-t-2xl bg-white
         transform translate-y-0 hover:-translate-y-8 transition-transform duration-300">
            <div className="flex items-center text-2xl">
      <img
        src="/addanotebutton.svg"
        alt="Logo"
        className="w-16 hover:scale-110 transition-transform m-3 cursor-pointer"
      />  
      <p>Add a note...</p>
            </div>
        </div>
    )
}