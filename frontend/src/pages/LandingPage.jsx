import { useState } from "react"
import usePageMeta from "../hooks/usePageMeta"
import { useNavigate } from "react-router-dom";
import API from "../api";


function SignInForm({ setFormMode }){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

  
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await API.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", response.data.access_token);
      alert("Signed in successfully!");
      navigate("/ws");
      console.log("Login Success: ", response.data);
    } catch(error) {
      console.error("Login Failed: ", error.response?.data || error.message );
      // alert(error.response?.data?.detail || "Sign in Failed.");


              setErrorMsg("- " + `${error.response?.data?.detail || "Sign in Failed."}` + " -");
    }
  };
    
    return(
      <div className="hover:scale-110 transition-transform flex justify-center items-center bg-gradient-to-br from-slate-300 to-slate-500 rounded-2xl w-80 lg:w-[30vw] h-80">
       <div className="w-72 lg:w-[28vw] h-72 rounded-2xl bg-gradient-to-b from-slate-300 to-slate-100 p-4">
          <form className="flex flex-col gap-3" onSubmit={handleSignIn}>
            <h2 className="text-gray-700 text-xl font-semibold text-center">Sign in here to start!</h2>

            <input
              type="email"
              placeholder="Email"
              required
              className="border rounded-md px-3 py-2 "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
       
<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    required
    className="border rounded-md px-3 py-2 w-full pr-10"
    value={password}
    onChange={(e) => {
  setPassword(e.target.value);
  setErrorMsg("");
}}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    {showPassword ? "👁-👁" : "( ᴗ͈ˬᴗ͈)"}
  </span>
</div>
<div>
    <p className="text-red-500 font-bold italic text-md w-full text-center">
  {errorMsg}
</p>
</div>
      <button
        type="submit"
        className="hover:text-blue-600 hover:bg-white hover:border-2 border-blue-600 mt-2 rounded-md bg-blue-600 px-3 py-2 text-white"
      >
        Sign In
      </button>
          </form>
          <p className="text-blue-900 italic mt-2 text-md font-semibold text-center">Someone New? <button
              type="button"
               onClick={() => setFormMode("register")}
              className="italic underline hover:font-bold hover:text-blue-400 text-blue-700">
             Register here
            </button>
</p>
        </div>
              </div>
    )
    
}


function RegisterForm({setFormMode }) {

    const [accMode, setAccMode] = useState("");
    const [optionChoosen, setOption] = useState(false);

    const [cloudLocked, setCloudLocked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");


    const [username, setUsername ] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");

    const handleRegister = async(e) => {
      e.preventDefault();

      try {
        const response = await API.post("/api/auth/register", {
          username,
          email,
          password,
          account_mode: "local"
        });

        alert("Account created succesfully!");
        console.log("Register success:", response.data);

        setUsername("");
        setEmail("");
        setPassword("");

        setFormMode("signIn");

      } catch (error) {

        console.error("Register failed:", error.response?.data || error.message);
        // alert(error.response?.data?.detail || "Registration failed. ");

              setErrorMsg("- " + `${error.response?.data?.detail || "Registration failed. "}` + " -");
      }
      };

    const saveOption = (
        <div className="hover:scale-110 transition-transform flex justify-center items-center bg-gradient-to-br from-slate-300 to-slate-500 rounded-2xl w-80 lg:w-[30vw] h-72">
        <div className="w-72 lg:w-[28vw] h-64 rounded-2xl bg-gradient-to-b from-slate-300 to-slate-100 p-4">
          <h2 className="text-gray-700 text-lg font-semibold text-center">Please Choose 1 option</h2>
          <p className="text-sm text-center p-2 text-gray-700">(Cloud save offers cross-device access, whereas local save is computer-specific.)</p>

            <div className="flex flex-col gap-2 text-white items-center">
              <button 
              type="button"
              onClick={
                () => {setAccMode("local")
                setOption(true)}
              }

              className="hover:text-[#4b6ebb] hover:bg-white hover:border-2 border-blue-600 hover:scale-105 hover:transition-transform w-full rounded-md px-3 py-2  bg-[#4b6ebb]">Local Save</button>
              <button
  type="button"
  onClick={() => {
    setCloudLocked(true);
  }}
  className="w-full rounded-md px-3 py-2 bg-blue-400 
             hover:text-blue-400 hover:bg-white hover:border-2 
             border-blue-600 hover:scale-105 transition-transform"
>
  {cloudLocked 
    ? "Will be available in future updates!" 
    : "Cloud Save"}
</button>
<button
              type="button"
               onClick={() => setFormMode("signIn")}
              className="italic text-black hover:font-bold border-red-500 hover:border-2 hover:text-red-500 text-sm w-28 rounded mt-1">
             - Go Back -
</button>
            </div>
        </div>
    </div>
    )

    const cloudForm = (
    
  <div className="flex justify-center items-center bg-gradient-to-br from-slate-300 to-slate-500 rounded-2xl w-80 lg:w-[30vw] h-[25rem]">
  <div className="hover:scale-110 transition-transform hover:border-2 border-gray-900 w-72 lg:w-[28vw] h-[22rem] rounded-2xl bg-gradient-to-b from-slate-300 to-slate-100 p-4">
    <form className="flex flex-col gap-3 items-center" onSubmit={handleRegister}>
      <h2 className="text-gray-700 text-lg font-semibold">
        Create a Cloud Account
      </h2>

      <input
        type="text"
        placeholder="Name"
        required
        className="border rounded-md px-3 py-2 w-56 lg:w-72"
      />

      <input
        type="email"
        placeholder="Email"
        required
        className="border rounded-md px-3 py-2 w-64 lg:w-72"
      />

<div className="relative w-64 lg:w-72">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    required
    className="border rounded-md px-3 py-2 w-full pr-10"
        value={password}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    {showPassword ? "👁-👁" : "( ᴗ͈ˬᴗ͈)"}
  </span>
</div>
<div>
<p className="text-red-500 font-bold italic text-sm">
  {errorMsg}
</p>
  </div>
      <button
        type="submit"
        className="hover:text-blue-600 hover:bg-white hover:border-2 border-blue-600 mt-2 rounded-md bg-blue-600 px-3 py-2 text-white  w-56 lg:w-64"
      >
        Register
      </button>
          <button
              type="button"
               onClick={() => setFormMode("signIn")}
              className="italic text-black hover:font-bold border-red-500 hover:border-2 hover:text-red-500 text-sm w-28 rounded">
             - Go Back -
</button>
    </form>

  </div>
</div>
        );

    const localForm = (
        
  <div className="flex justify-center items-center bg-gradient-to-br from-slate-300 to-slate-500 rounded-2xl w-80 lg:w-[30vw] h-[25rem]">
  <div className="hover:scale-110 transition-transform hover:border-2 border-gray-900 w-72 lg:w-[28vw] h-[22rem] rounded-2xl bg-gradient-to-b from-slate-300 to-slate-100 p-4">
    <form className="flex flex-col gap-3 items-center" onSubmit={handleRegister}>
      <h2 className="text-gray-700 text-xl font-semibold">
         Create a Local Account 
      </h2>

      <input
        type="text"
        placeholder="Name"
        required
        className="border rounded-md px-3 py-2 w-56 lg:w-72"
        value={username}
onChange={(e) => {
  setUsername(e.target.value);
  setErrorMsg("");
}}/>

      <input
        type="email"
        placeholder="Email"
        required
        className="border rounded-md px-3 py-2 w-64 lg:w-72"
        value={email}
              onChange={(e) => {
  setEmail(e.target.value);
  setErrorMsg("");
}}
      />

<div className="relative w-64 lg:w-72">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    required
    className="border rounded-md px-3 py-2 w-full pr-10"
    value={password}
    onChange={(e) => {
  setPassword(e.target.value);
  setErrorMsg("");
}}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    {showPassword ? "👁-👁" : "( ᴗ͈ˬᴗ͈)"}
  </span>
</div>

<div>
<p className="text-red-500 font-bold italic text-sm">
  {errorMsg}
</p>
  </div>
      <button
        type="submit"
        className="hover:text-blue-600 hover:bg-white hover:border-2 border-blue-600 mt-2 rounded-md bg-blue-600 px-3 py-2 text-white  w-56 lg:w-64"
      >
        Register
      </button>
          <button
              type="button"
               onClick={() => setFormMode("signIn")}
              className="italic text-black hover:font-bold border-red-500 hover:border-2 hover:text-red-500 text-sm w-28 rounded">
             - Go Back -
</button>
    </form>

  </div>
</div>
    );

    let forms;

    if(accMode === "local"){
      forms = localForm;
    }
    
    if(accMode === "cloud"){
      forms = cloudForm;
    }

    return (
      <div>
        {optionChoosen ? forms : saveOption }
      </div>
    )
}

export default function MainPage() {
      usePageMeta("Taskxit | Welcome!",
          "Sign In to start using Taskxit."
    )

    const [formMode, setFormMode] = useState("signIn")


  return (
    <div className="h-[120vh] flex flex-col items-center">
      <img
        src="/taskxit_logo.svg"
        alt="Logo"
        className="w-[72vw] md:w-[44vw] hover:scale-110 transition-transform mt-10"
      />

      <p className="mb-8 text-xl italic">
        The quickest exit from your daily tasks.
      </p>


        {formMode === "signIn" ? <SignInForm setFormMode={setFormMode}/> : <RegisterForm setFormMode={setFormMode}/>}
    </div>
  )
}
