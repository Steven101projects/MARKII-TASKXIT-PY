import { useState } from "react"

function SignInForm({ setFormMode }){
    
    return(
      <div className="hover:scale-110 transition-transform flex justify-center items-center bg-gradient-to-br from-slate-300 to-slate-500 rounded-2xl w-80 lg:w-[30vw] h-64">
       <div className="w-72 lg:w-[28vw] h-56 rounded-2xl bg-gradient-to-b from-slate-300 to-slate-100 p-4">
          <form className="flex flex-col gap-3">
            <h2 className="text-gray-700 text-lg font-semibold text-center">Sign in here to start!</h2>

            <input
              type="email"
              placeholder="Email"
              required
              className="border rounded-md px-3 py-2"
            />

            <input
              type="password"
              placeholder="Password"
              required
              className="border rounded-md px-3 py-2"
            />

            
          </form>
          <p className="text-blue-900 italic mt-6 text-md font-semibold text-center">Someone New? <button
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
              onClick={
                () => {setAccMode("cloud")
                setOption(true)}
              }
              className="hover:text-blue-400 hover:bg-white hover:border-2 border-blue-600 hover:scale-105 hover:transition-transform w-full rounded-md px-3 py-2 bg-blue-400">Cloud Save</button>
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
    
  <div className="flex justify-center items-center bg-gradient-to-br from-slate-300 to-slate-500 rounded-2xl w-80 lg:w-[30vw] h-[22rem]">
  <div className="hover:scale-110 transition-transform hover:border-2 border-gray-900 w-72 lg:w-[28vw] h-80 rounded-2xl bg-gradient-to-b from-slate-300 to-slate-100 p-4">
    <form className="flex flex-col gap-3 items-center">
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

      <input
        type="password"
        placeholder="Password"
        required
        className="border rounded-md px-3 py-2 w-64 lg:w-72"
      />

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
        
  <div className="flex justify-center items-center bg-gradient-to-br from-slate-300 to-slate-500 rounded-2xl w-80 lg:w-[30vw] h-[22rem]">
  <div className="hover:scale-110 transition-transform hover:border-2 border-gray-900 w-72 lg:w-[28vw] h-80 rounded-2xl bg-gradient-to-b from-slate-300 to-slate-100 p-4">
    <form className="flex flex-col gap-3 items-center">
      <h2 className="text-gray-700 text-xl font-semibold">
         Create a Local Account 
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

      <input
        type="password"
        placeholder="Password"
        required
        className="border rounded-md px-3 py-2 w-64 lg:w-72"
      />

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
    } else if(accMode === "cloud"){
      forms = cloudForm;
    }

    return (
      <div>
        {optionChoosen ? forms : saveOption }
      </div>
    )
}




export default function MainPage() {

    const [formMode, setFormMode] = useState("signIn")

  return (
    <div className="h-[120vh] flex flex-col items-center">
      <img
        src="/taskxit_logo.svg"
        alt="Logo"
        className="w-[72vw] md:w-[44vw] hover:scale-110 transition-transform"
      />

      <p className="mb-8 text-xl italic">
        The quickest exit from your daily tasks.
      </p>


        {formMode === "signIn" ? <SignInForm setFormMode={setFormMode}/> : <RegisterForm setFormMode={setFormMode}/>}
    </div>
  )
}
