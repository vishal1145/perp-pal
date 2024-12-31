import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaWhatsapp,
  FaFacebook,
  FaUser,
  FaMicrophone,
} from "react-icons/fa";
import SignIn from "@/app/[locale]/(unauth)/signIn/page";
import SignUp from "@/app/[locale]/(unauth)/SignUP/page";
import ForgetPassword from "@/app/[locale]/(unauth)/forgetPassword/page";
import {
  freePrompt,
  setFreePrompt,
  setUserProfile,
  userProfile,
  userProfileLoading,
} from "@/data/functions";
import logo from "../images/logo1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SharePreppal from "./SharePreppal";
interface DemoBannerProps {
  notMainPage: boolean;
  user: any;
  loadingUserData: any;
  onLogin: (userData: any) => void;
  onLogout: () => void;
}

export const Banner: React.FC<DemoBannerProps> = ({
  notMainPage,
  user,
  onLogin,
  onLogout,
  loadingUserData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [localuser, setLocalUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const[sharePreppal, setSharePreppal] = useState(false);
  const router = useRouter();
  const openModal = (isSignInModal: boolean) => {
    setIsSignIn(isSignInModal);
    setIsModalOpen(true);
    setIsForgetPassword(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsForgetPassword(false);
  };

  const openForgetPassword = () => {
    setIsForgetPassword(true);
    setIsModalOpen(true);
  };

  const handleLogin = (userData) => {
    setLocalUser(userData);
    closeModal();
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest("#avatarButton") &&
        !event.target.closest("#userDropdown")
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);



  }, []);

  const signOut = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/users/logout`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setLocalUser(null);
        setUserProfile(null);
        router.push('/');
        user(null);
      }  
    } catch (error) {
    }
    setIsDropdownOpen(false);
  };

  const handleSignUp = (userData) => {
    setLocalUser(userData);
    closeModal();
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    setFreePrompt();
    router.prefetch('/how-it-work');
  }, []);

  const handleMicClick = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      let timeoutId: NodeJS.Timeout;

      recognition.start();

      recognition.onresult = (event: any) => {
        const results = event.results;
        const transcript = results[results.length - 1][0].transcript; // Get the latest result
        setSearchText(transcript);

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          recognition.stop();
        }, 2000);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        console.log("Speech recognition service disconnected");
        clearTimeout(timeoutId);
      };
    } else {
      alert("Your browser does not support speech recognition.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      if(freePrompt == false){
        setSharePreppal(true);
        return;
      }
      const formattedText = searchText.trim().replace(/\s+/g, "--"); // Format the text
      router.push(`/e-paper/${formattedText}`); // Navigate to the formatted URL
    }
  }; 

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="px-4 sm:px-8">
          <div className="flex h-[50px] items-center justify-between text-lg font-normal text-gray-900 lg:h-[55px]">
            <div className="flex items-center">
              {!notMainPage ? (
                <ul className="flex gap-4">
                  <li>
                    <Link href="/how-it-work">
                      <p className="text-sm hover:text-cyan-600 sm:text-base  ">
                        How It Works
                      </p>
                    </Link>
                  </li>

                  <li >
                    <Link href="/blogs" target="_blank">
                      <p className="text-sm hover:text-cyan-600 sm:text-base  ">
                        Blogs
                      </p>
                    </Link>
                  </li>

                  <li >
                    <Link href="/tuitions" target="_blank">
                      <p className="text-sm hover:text-cyan-600 sm:text-base  ">
                      Tuitions
                      </p>
                    </Link>
                  </li>

                  <li >
                    <Link href="/notes" target="_blank">
                      <p className="text-sm hover:text-cyan-600 sm:text-base  ">
                      Notes
                      </p>
                    </Link>
                  </li>
                </ul>
              ) : (
                <div className="flex items-center" id="div1">
                  <a
                    href="/"
                    className="flex items-center"
                  >
                    <Image
                      src={logo}
                      className="w-[85px]"
                      alt="Flowbite Logo"
                    />
                  </a>
                </div>
              )}
            </div>

            {notMainPage && (
              <div
                className="relative col-span-8 flex w-full items-center sm:w-2/5 lg:col-span-6"
                id="div2"
              >
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <FaSearch className="text-gray-400" />
                </span>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Type a text to generate practice questions."
                  className="h-9 w-full rounded-full border border-gray-300 bg-gray-100 px-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <span className="absolute inset-y-0 right-3 flex items-center">
                  <FaMicrophone
                    className="cursor-pointer text-gray-400"
                    onClick={handleMicClick}
                  />
                </span>
              </div>
            )}

            <div
              className="ml-2 flex space-x-2 sm:ml-4 sm:space-x-5 "
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {!notMainPage && (
                <>
            
                  <a
                    href="https://chat.whatsapp.com/DYl8T4Iuimw6WZ3WWcZD3W"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp
                      className="text-gray-900 transition hover:text-cyan-700"
                      size={20}
                    />
                  </a>
                 
                  <a
                    href=" https://www.facebook.com/profile.php?id=61567170720121 "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook
                      className="text-gray-900 transition hover:text-cyan-600"
                      size={20}
                    />
                  </a>
                </>
              )}
              {loadingUserData && userProfileLoading == false ? (
                <div className="relative w-8 h-8"></div>
              ) : userProfile ? (
                <div className="relative cursor-pointer">
                  <FaUser
                    id="avatarButton"
                    className="text-gray-900 transition hover:text-cyan-600"
                    size={20}
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <div
                      id="userDropdown"
                      className="absolute right-0 mt-2 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-lg"
                    >
                      <div className="px-4 py-3 text-sm text-gray-900">
                      <div className="max-w-sm overflow-hidden truncate">{userProfile.username}</div>
                        <div className="truncate font-medium">
                          {userProfile.email}
                        </div>
                      </div>
                      <ul className="py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <li>
                          <Link href="/user-profile">
                            <p className="block px-4 ">User Profile</p>
                          </Link>
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        onClick={signOut}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : userProfileLoading == false ? (
                <button
                  onClick={() => openModal(true)}
                  className="border w-[80px] h-9 bg-transparent cursor-pointer font-medium rounded-lg text-sm flex items-center justify-center focus:outline-none hover:bg-gray-200"
                  style={{
                    border: "1px solid rgb(226, 226, 226)",
                    color: "rgb(107, 114, 128)",
                  }}
                >
                  Login
                </button>
              ) :  <button className="border invisible w-[20px] h-9">
              </button>
              }
            </div>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {isForgetPassword ? (
            <ForgetPassword
              onClose={closeModal}
              onSwitchToSignIn={() => openModal(true)}
            />
          ) : isSignIn ? (
            <SignIn
              onClose={closeModal}
              onSwitchToSignUp={() => openModal(false)}
              onForgotPassword={openForgetPassword}
              onLogin={handleLogin}
            />
          ) : (
            <SignUp
              onClose={closeModal}
              onSwitchToSignIn={() => openModal(true)}
              onSignUp={handleSignUp}
            />
          )}
        </div>
      )}

      {
        sharePreppal && <SharePreppal setSharePreppal={setSharePreppal}/>
      }
    </>
  );
};
