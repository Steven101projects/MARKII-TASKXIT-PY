import { useState } from "react"

function SignInForm({ setFormMode }){
    
    return(
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
    )
    
}


function RegisterForm({setFormMode }) {

    const [accMode, setAccMode] = useState("");

    const cloudSave = (
        <div>

        </div>
    )

    return (

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
          <p className="text-blue-900 italic mt-6 text-md font-semibold text-center">Already have an Account? <button
              type="button"
               onClick={() => setFormMode("signIn")}
              className="italic underline hover:font-bold hover:text-blue-400 text-blue-700">
             Sign here
            </button>
</p>
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
        className="w-[72vw] md:w-[44vw]"
      />

      <p className="mb-8 text-xl">
        The quickest exit from your daily tasks.
      </p>

      <div className="flex justify-center items-center bg-gradient-to-br from-slate-300 to-slate-500 rounded-2xl w-80 lg:w-[30vw] h-64">
        {formMode === "signIn" ? <SignInForm setFormMode={setFormMode}/> : <RegisterForm setFormMode={setFormMode}/>}

      </div>
    </div>
  )
}
