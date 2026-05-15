import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ToastBox from "../ToastBox";
import useIsMobile from "../../hooks/useIsMobile";

export default function HeaderMenu() {
  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const handleLogout = () => {
    setToast({
      message: "Logged out successfully!",
      type: "success",
    });

    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/");
    }, 700);
  };

  return (
    <>
      <ToastBox
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({
            message: "",
            type: "success",
          })
        }
      />

      <aside
  className="
    absolute top-20 left-0 z-50
    w-64 h-[70vh]
    rounded-r-3xl
    border-r-2 border-t-2 border-b-2 border-orange-300
    bg-white/95 shadow-xl
    px-5 py-6
    flex flex-col
    overflow-hidden
  "
>
        <div
  className="
    space-y-6
    overflow-y-auto
    pr-2
    custom-scroll
    flex-1
  "
>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Menu
            </h2>

            <p className="text-sm text-slate-500">
              Taskxit Version 1.1
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <button
              className="
                w-full rounded-xl px-4 py-3
                text-left text-slate-700 font-medium
                hover:bg-slate-100 transition
              "
              onClick={() => navigate("/ws")}
            >
              Workstation (Home)
            </button>

            {isMobile && (
              <>
                <button
                  className="
                    w-full rounded-xl px-4 py-3
                    text-left text-slate-700 font-medium
                    hover:bg-slate-100 transition
                  "
                  onClick={() => navigate("/journal")}
                >
                  Journal
                </button>

                <button
                  className="
                    w-full rounded-xl px-4 py-3
                    text-left text-slate-700 font-medium
                    hover:bg-slate-100 transition
                  "
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>

                <button
                  className="
                    w-full rounded-xl px-4 py-3
                    text-left text-slate-700 font-medium
                    hover:bg-slate-100 transition
                  "
                  onClick={() => navigate("/editnote/")}
                >
                  Folders
                </button>
              </>
            )}

            <button
              className="
                w-full rounded-xl px-4 py-3
                text-left text-slate-700 font-medium
                hover:bg-slate-100 transition
              "
            >
              How to use it?
            </button>

            <button
              className="
                w-full rounded-xl px-4 py-3
                text-left text-slate-700 font-medium
                hover:bg-slate-100 transition
              "
            >
              Settings
            </button>

            <button
              className="
                w-full rounded-xl px-4 py-3
                text-left text-red-600 font-semibold
                hover:bg-red-50 transition
              "
              onClick={handleLogout}
            >
              Log Out
            </button>
          </nav>

          <div className="border-t border-slate-200 pt-4">
            <p
              className="
                px-2 text-xs font-semibold
                uppercase tracking-wide text-slate-400
              "
            >
              About
            </p>

            <div className="mt-3 flex flex-col gap-2">
              <button
                className="
                  w-full rounded-xl px-4 py-3
                  text-left text-slate-700 font-medium
                  hover:bg-slate-100 transition
                "
              >
                Creator
              </button>

              <button
                className="
                  w-full rounded-xl px-4 py-3
                  text-left text-slate-700 font-medium
                  hover:bg-slate-100 transition
                "
              >
                Support us
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-400 text-center">
            © 2026 Taskxit. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  );
}