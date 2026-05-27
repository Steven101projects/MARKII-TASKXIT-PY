import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useIsMobile from "../hooks/useIsMobile";

import API from "../api/API.js";

export default function UserProfilePage() {

  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchUser() {

      try {

        const response = await API.get(
          "/api/me"
        );

        setUser(response.data);

      } catch (error) {

        console.error(
          "Failed to fetch current user:",
          error
        );

        localStorage.removeItem("token");

        navigate("/");
      } finally {

        setLoading(false);
      }
    }

    fetchUser();

  }, [navigate]);

  function Profile() {

    if (loading) {

      return (

        <div
          className="
            bg-white
            w-[85%]
            h-[83%]
            rounded-3xl
            mt-10
            flex items-center justify-center
            text-3xl
            font-bold
          "
        >
          Loading profile...
        </div>
      );
    }

    if (!user) {

      return (

        <div
          className="
            bg-white
            w-[85%]
            h-[83%]
            rounded-3xl
            mt-10
            flex items-center justify-center
            text-3xl
            font-bold
          "
        >
          No user data found.
        </div>
      );
    }

    if (isMobile) {

      return (

        <div
          className="
            bg-white

            w-[92%]
            h-[85%]

            rounded-3xl

            mt-6

            px-6
            py-8

            flex
            flex-col

            overflow-y-auto
          "
        >

          {/* Profile Avatar */}

          <div className="flex justify-center">

            <div
              className="
                w-32
                h-32

                rounded-full

                border-[4px]
                border-blue-500

                bg-gray-100

                flex
                items-center
                justify-center

                text-5xl
                font-bold
              "
            >
              {
                user.username
                  ? user.username
                      .charAt(0)
                      .toUpperCase()
                  : "?"
              }
            </div>

          </div>

          {/* Username */}

          <div className="text-center mt-6">

            <p
              className="
                text-4xl
                font-bold
                break-words
              "
            >
              {user.username || "User"}
            </p>

            <p
              className="
                text-gray-500
                text-lg
                mt-2
                break-all
              "
            >
              {user.email}
            </p>

          </div>

          {/* Divider */}

          <div className="w-full mt-8">

            <hr
              className="
                border-gray-300
                border-2
                rounded-full
              "
            />

          </div>

          {/* User Details */}

          <div
            className="
              mt-8
              flex flex-col
              gap-5
            "
          >

            <div
              className="
                bg-[#f5f5f5]

                border-2
                border-[#d6d6d6]

                rounded-2xl

                p-5
              "
            >

              <p
                className="
                  text-gray-500
                  text-sm
                  mb-2
                "
              >
                USER ID
              </p>

              <p
                className="
                  text-xl
                  font-bold
                  break-all
                "
              >
                {user.id}
              </p>

            </div>

            <div
              className="
                bg-[#f5f5f5]

                border-2
                border-[#d6d6d6]

                rounded-2xl

                p-5
              "
            >

              <p
                className="
                  text-gray-500
                  text-sm
                  mb-2
                "
              >
                ACCOUNT TYPE
              </p>

              <p
                className="
                  text-xl
                  font-bold
                  capitalize
                "
              >
                {user.account_mode}
              </p>

            </div>

          </div>

          {/* Action Buttons */}

          <div
            className="
              mt-auto
              pt-10
              flex flex-col
              gap-4
            "
          >

            <button
              className="
                w-full

                bg-primary

                text-white

                text-xl
                font-bold

                py-4

                rounded-2xl

                transition-all

                hover:scale-[1.02]
              "
            >
              Edit Profile
            </button>

            <button
              className="
                w-full

                bg-white

                text-red-500

                text-xl
                font-bold

                py-4

                rounded-2xl

                border-2
                border-red-600

                transition-all

                hover:bg-white
              "
            >
              Delete Account
            </button>

          </div>

        </div>
      );
    }

    return (

      <div
        className="
          bg-white
          w-[85%]
          h-[83%]
          rounded-3xl
          mt-10
          flex
        "
      >

        <div
          className="
            rounded-full
            w-[20%]
            h-[40%]

            border-[#ffbd59]
            border-2

            m-9

            flex items-center justify-center

            text-5xl
            font-bold

            bg-gray-100
          "
        >
          {
            user.username
              ? user.username
                  .charAt(0)
                  .toUpperCase()
              : "?"
          }
        </div>

        <div
          className="
            w-full
            h-full
            mr-20
          "
        >

          <div className="pt-40">

            <div
              className="
                w-full
                flex
                justify-between
                items-baseline
              "
            >

              <div
                className="
                  text-7xl
                  font-bold
                "
              >
                <p>
                  {
                    user.username ||
                    user.email ||
                    "You"
                  }
                </p>
              </div>

              <div
                className="
                  text-3xl
                  text-end
                "
              >
                <p>
                  Email: {user.email}
                </p>

                <p>
                  ID: {user.id}
                </p>
              </div>

            </div>

            <hr
              className="
                border-gray-500
                border-2
              "
            />

          </div>

          <div
            className="
              bg-gray-300
              w-full
              h-[60%]
              mt-10
              p-10
            "
          >

            <div
              id="userStatus"
              className="
                flex
                w-full
                justify-evenly
              "
            >

              <div
                className="
                  bg-white
                  text-4xl
                  text-center
                  px-10
                  py-5
                  cursor-not-allowed
                  border-blue-950
                  border-2
                "
              >
                <p>
                  <span>
                    Save type:
                  </span>

                  {" "}

                  {user.account_mode}
                </p>
              </div>

              <div
                className="
                  bg-white
                  text-4xl
                  text-center
                  px-10
                  py-5
                  cursor-pointer
                  border-blue-950
                  border-2
                "
              >
                <button>
                  Edit Profile Details
                </button>
              </div>

            </div>

            <div
              className="
                w-full
                h-full
                flex
                justify-center
                items-end
                pb-20
              "
            >

              <button
                className="
                  bg-black
                  text-white
                  px-7
                  py-6
                  text-4xl
                  border-2
                  border-black
                  hover:bg-white
                  hover:text-red-500
                "
              >
                Delete Account
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  return (

    <div
      className="
        bg-primary
        w-screen
        h-screen
        p-6

        flex
        flex-col
        items-center
      "
    >

      <div className="w-full">

        <div
          onClick={() =>
            navigate("/ws")
          }
          className="
            text-white
            font-bold
            text-7xl
            cursor-pointer
          "
        >
          Taskxit
        </div>

      </div>

      <Profile />

    </div>
  );
}