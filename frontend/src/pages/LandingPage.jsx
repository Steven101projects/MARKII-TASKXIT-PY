import { useState } from "react";
import usePageMeta from "../hooks/usePageMeta";
import { useNavigate } from "react-router-dom";

import API from "../api/index.js";

import ToastBox from "../components/ToastBox";

function SignInForm({ setFormMode, setToast }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [errorMsg, setErrorMsg] =
    useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {

    e.preventDefault();

    try {

      const formData = new URLSearchParams();

      formData.append("username", username);

      formData.append("password", password);

      const response = await API.post(
        "/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      setToast({
        message:
          "Signed in successfully!",
        type: "success",
      });

      setTimeout(() => {

        navigate("/ws");

      }, 700);

      console.log(
        "Login Success:",
        response.data
      );

    } catch (error) {

      console.error(
        "Login Failed:",
        error.response?.data ||
          error.message
      );

      setErrorMsg(
        "- " +
          `${
            error.response?.data?.detail ||
            "Sign in Failed."
          }` +
          " -"
      );
    }
  };

  return (

    <div
      className="
        hover:scale-110
        transition-transform
        flex justify-center items-center
        bg-gradient-to-br
        from-slate-300
        to-slate-500
        rounded-2xl
        w-80
        lg:w-[30vw]
        h-80
      "
    >

      <div
        className="
          w-72
          lg:w-[28vw]
          h-72
          rounded-2xl
          bg-gradient-to-b
          from-slate-300
          to-slate-100
          p-4
        "
      >

        <form
          className="flex flex-col gap-3"
          onSubmit={handleSignIn}
        >

          <h2
            className="
              text-gray-700
              text-xl
              font-semibold
              text-center
            "
          >
            Sign in here to start!
          </h2>

          <input
            type="email"
            placeholder="Email"
            required
            className="
              border
              rounded-md
              px-3 py-2
            "
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              required
              className="
                border
                rounded-md
                px-3 py-2
                w-full
                pr-10
              "
              value={password}
              onChange={(e) => {
                setPassword(
                  e.target.value
                );

                setErrorMsg("");
              }}
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                cursor-pointer
              "
            >
              {showPassword
                ? "👁-👁"
                : "( ᴗ͈ˬᴗ͈)"}
            </span>

          </div>

          <div>

            <p
              className="
                text-red-500
                font-bold
                italic
                text-md
                w-full
                text-center
              "
            >
              {errorMsg}
            </p>

          </div>

          <button
            type="submit"
            className="
              hover:text-blue-600
              hover:bg-white
              hover:border-2
              border-blue-600
              mt-2
              rounded-md
              bg-blue-600
              px-3 py-2
              text-white
            "
          >
            Sign In
          </button>

        </form>

        <p
          className="
            text-blue-900
            italic
            mt-2
            text-md
            font-semibold
            text-center
          "
        >

          Someone New?

          <button
            type="button"
            onClick={() =>
              setFormMode("register")
            }
            className="
              italic
              underline
              hover:font-bold
              hover:text-blue-400
              text-blue-700
            "
          >
            Register here
          </button>

        </p>

      </div>

    </div>
  );
}

function RegisterForm({
  setFormMode,
  setToast,
}) {

  const [accMode, setAccMode] =
    useState("");

  const [optionChoosen, setOption] =
    useState(false);

  const [cloudLocked, setCloudLocked] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [errorMsg, setErrorMsg] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
          account_mode: "local",
        }
      );

      console.log(
        "Register success:",
        response.data
      );

      setUsername("");
      setEmail("");
      setPassword("");

      setToast({
        message:
          "Account created successfully!",
        type: "success",
      });

      setFormMode("signIn");

    } catch (error) {

      console.error(
        "Register failed:",
        error.response?.data ||
          error.message
      );

      setErrorMsg(
        "- " +
          `${
            error.response?.data?.detail ||
            "Registration failed."
          }` +
          " -"
      );
    }
  };

  return (
    <div>
      {/* Keep your existing UI here */}
    </div>
  );
}

export default function MainPage() {

  usePageMeta(
    "Taskxit | Welcome!",
    "Sign In to start using Taskxit."
  );

  const [formMode, setFormMode] =
    useState("signIn");

  const [toast, setToast] =
    useState({
      message: "",
      type: "success",
    });

  return (

    <div
      className="
        h-[120vh]
        flex flex-col
        items-center
      "
    >

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

      <img
        src="/taskxit_logo.svg"
        alt="Logo"
        className="
          w-[72vw]
          md:w-[44vw]
          hover:scale-110
          transition-transform
          mt-10
        "
      />

      <p
        className="
          mb-8
          text-xl
          italic
        "
      >
        The quickest exit from your daily tasks.
        (Beta v.1.1)
      </p>

      {formMode === "signIn" ? (

        <SignInForm
          setFormMode={setFormMode}
          setToast={setToast}
        />

      ) : (

        <RegisterForm
          setFormMode={setFormMode}
          setToast={setToast}
        />

      )}

    </div>
  );
}