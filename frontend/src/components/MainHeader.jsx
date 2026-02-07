




export default function MainHeader(){

    return(
        <header className="w-full h-24 bg-[#6d84fe] text-white
        flex items-center justify-center">
    <div 
    className="flex absolute left-0">
      <img
        src="/burger-menu.svg"
        alt="Logo"
        className="w-20 hover:scale-110 transition-transform mr-3 ml-3 cursor-pointer"
      />  
         <img
        src="/user_logo.svg"
        alt="Logo"
        className="w-14 hover:scale-110 transition-transform cursor-pointer"
      />
    </div>
            <div className="font-bold text-5xl">Taskxit</div>
    <div 
    className="flex absolute right-0">
   <img
        src="/pencil_logo.svg"
        alt="Logo"
        className="w-14 hover:scale-110 transition-transform mr-3 cursor-pointer"
      />
    <img
        src="/journal_logo.svg"
        alt="Logo"
        className="w-16 hover:scale-110 transition-transform mr-5 cursor-pointer"
      />
    </div>

        </header>
    )
};