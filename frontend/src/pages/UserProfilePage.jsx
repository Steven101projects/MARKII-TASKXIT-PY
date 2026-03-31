import { useNavigate } from "react-router-dom"
import useIsMobile from "../hooks/useIsMobile";


export default function UserProfilePage(){
    
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  
function Profile(){
    if(isMobile){
<div className="bg-white w-[85%] h-[83%] rounded-3xl mt-10">
    
</div>
    } else {
        return (
<div className="bg-white w-[85%] h-[83%] rounded-3xl mt-10 flex">
<img
  src="/userprofile.png"
  alt="example"
  className="rounded-full w-[20%] h-[40%] object-cover border-[#ffbd59] border-2 m-9"
/>
<div className="w-full h-full mr-20">
  <div className="pt-40">
 <div className="w-full flex justify-between items-baseline">
        <div className=" text-7xl font-bold">
        <p>Name</p>
        </div>
        <div className=" text-3xl">
            <p>id: 09dcvs87</p>
        </div>
    </div>
<hr className="border-gray-500 border-2" />
    </div>
<div className="bg-gray-300 w-full h-[60%] mt-10 p-10">
    <div id="userStatus" className="flex w-full justify-evenly">
        <div className="bg-white text-4xl text-center px-10 py-5 cursor-not-allowed border-blue-950 border-2">
            <p><span>Save type: </span>Cloud</p>
        </div>
                <div  className="bg-white text-4xl text-center px-10 py-5 cursor-pointer border-blue-950 border-2">
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
        )
    }
  }

    return (
        <div className="bg-primary w-screen h-screen p-6 flex flex-col items-center">
<div className="w-full">
      <div onClick={() => navigate("/ws")} className="text-white font-bold text-7xl cursor-pointer">Taskxit</div>
</div>
<Profile />
</div>
    )
}