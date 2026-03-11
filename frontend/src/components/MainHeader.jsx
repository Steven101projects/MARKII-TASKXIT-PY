import { useState } from "react";
import HeaderMenu from "./main_header_components/HeaderMenu";
import { useNavigate } from "react-router-dom";

export default function MainHeader() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="w-full h-24 bg-[#6d84fe] text-white flex items-center justify-center relative">
      {/* LEFT SIDE */}
            {open ? <HeaderMenu /> : ""}
      <div className="flex absolute left-0 items-center ml-6 gap-6">

        {/* Bigger Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="w-16 h-16 flex flex-col justify-center items-center relative"
        >
          <span
            className={`absolute h-[3px] w-12 bg-white rounded transition-all duration-300 ${
              open ? "rotate-45" : "-translate-y-3"
            }`}
          />
          <span
            className={`absolute h-[3px] w-12 bg-white rounded transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-[3px] w-12 bg-white rounded transition-all duration-300 ${
              open ? "-rotate-45" : "translate-y-3"
            }`}
          />
        </button>

        {/* User Icon */}
        <img
          src="/user_logo.svg"
          alt="Profile Page Button"
          onClick={() => navigate("/user")}
          className="w-14 hover:scale-110 transition-transform cursor-pointer"
        />
      </div>

      {/* CENTER TITLE */}
      <div onClick={() => navigate("/ws")} className="font-bold text-5xl cursor-pointer">Taskxit</div>

      {/* RIGHT SIDE */}
      <div className="flex absolute right-0 items-center mr-5 gap-3">
        <img
          src="/pencil_logo.svg"
          alt="Pencil"
          className="w-14 hover:scale-110 transition-transform cursor-pointer"
        />
        <img
          src="/journal_logo.svg"
          alt="Journal Page Button"
          onClick={() => navigate("/journal")}
          className="w-16 hover:scale-110 transition-transform cursor-pointer"
        />
      </div>

    </header>
  );
}
