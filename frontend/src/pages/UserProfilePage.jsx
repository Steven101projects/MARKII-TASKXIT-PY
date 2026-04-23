import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";
import axios from "axios";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch current user:", error);
        localStorage.removeItem("token");
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  function Profile() {
    if (loading) {
      return (
        <div className="bg-white w-[85%] h-[83%] rounded-3xl mt-10 flex items-center justify-center text-3xl font-bold">
          Loading profile...
        </div>
      );
    }

    if (!user) {
      return (
        <div className="bg-white w-[85%] h-[83%] rounded-3xl mt-10 flex items-center justify-center text-3xl font-bold">
          No user data found.
        </div>
      );
    }

    if (isMobile) {
      return (
        <div className="bg-white w-[85%] h-[83%] rounded-3xl mt-10 p-6 flex flex-col items-center">
          <div className="text-4xl font-bold mt-6">
            <p>{user.name || user.email || "Unnamed User"}</p>
          </div>

          <div className="text-xl mt-4">
            <p>ID: {user.id}</p>
          </div>

          <div className="bg-gray-300 w-full mt-10 p-6">
            <div className="bg-white text-xl text-center px-6 py-4 border-blue-950 border-2">
              <p>
                <span>Save type: </span>
                Cloud
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white w-[85%] h-[83%] rounded-3xl mt-10 flex">
        <div className="rounded-full w-[20%] h-[40%] border-[#ffbd59] border-2 m-9 flex items-center justify-center text-5xl font-bold bg-gray-100">
          {user.name ? user.name.charAt(0).toUpperCase() : "0 - 0"}
        </div>

        <div className="w-full h-full mr-20">
          <div className="pt-40">
            <div className="w-full flex justify-between items-baseline">
              <div className="text-7xl font-bold">
                <p>{user.username || user.email || "You"}</p>
              </div>
              <div className="text-3xl text-end">
                <p>Email: {user.email}</p>
                <p>ID: {user.id}</p>
              </div>
            </div>

            <hr className="border-gray-500 border-2" />
          </div>

          <div className="bg-gray-300 w-full h-[60%] mt-10 p-10">
            <div id="userStatus" className="flex w-full justify-evenly">
              <div className="bg-white text-4xl text-center px-10 py-5 cursor-not-allowed border-blue-950 border-2">
                <p>
                  <span>Save type: </span>
                  {user.account_mode}
                </p>
              </div>

              <div className="bg-white text-4xl text-center px-10 py-5 cursor-pointer border-blue-950 border-2">
                <button>Edit Profile Details</button>
              </div>
            </div>

            <div className="w-full h-full flex justify-center items-end pb-20">
              <button className="bg-black text-white px-7 py-6 text-4xl border-2 border-black hover:bg-white hover:text-red-500">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary w-screen h-screen p-6 flex flex-col items-center">
      <div className="w-full">
        <div
          onClick={() => navigate("/ws")}
          className="text-white font-bold text-7xl cursor-pointer"
        >
          Taskxit
        </div>
      </div>

      <Profile />
    </div>
  );
}