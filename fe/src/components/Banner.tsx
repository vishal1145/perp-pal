import Link from 'next/link';
import { useState,useEffect } from 'react';
import { FaSearch, FaTelegramPlane, FaWhatsapp, FaInstagram, FaFacebook,FaUser } from 'react-icons/fa';
import SignIn from '@/app/[locale]/(unauth)/signIn/page';
import SignUp from '@/app/[locale]/(unauth)/SignUP/page';
import ForgetPassword from '@/app/[locale]/(unauth)/forgetPassword/page';

interface DemoBannerProps {
  notMainPage: boolean;
  user: any;
  onLogin: (userData: any) => void; // Prop to handle login
  onLogout: () => void; // Prop to handle logout
}

export const Banner: React.FC<DemoBannerProps> = ({ notMainPage,user , onLogin, onLogout}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [localuser, setLocalUser] = useState(null); // State for user data
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    setLocalUser(userData); // Update state with user data
    closeModal();
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#avatarButton') && !event.target.closest('#userDropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
console.log("muskan",user)

const signOut = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users/logout', {
      method: 'Get', // Assuming POST is the correct method for logging out
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Clear user state
      setLocalUser(null);
      // Optionally, you can redirect the user to a different page or show a success message
      console.log('Successfully signed out');
    } else {
      console.error('Failed to sign out');
    }
  } catch (error) {
    console.error('Error during sign out:', error);
  }
  setIsDropdownOpen(false); // Close the dropdown after sign out
};
  return (
    <>
      <header className="sticky top-0 z-50 bg-white p-4 text-lg font-normal text-gray-900 flex items-center justify-between px-4">
        <div className="flex items-center px-4">
          <ul className="flex ">
            <li>
              <Link href="/how-it-work">
                <p className="text-base text-gray-900">How It Works</p>
              </Link>
            </li>
          </ul>
        </div>
        {notMainPage && (
          <div className="absolute right-20">
            <span className="absolute inset-y-0 left-0 flex items-center pl-5 sm:pl-7">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 w-full sm:p-2.5 pl-12 sm:pl-16 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
        <div className="flex space-x-5 ml-4 px-4">
          <a href="https://t.me/your-telegram-link" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane className="text-gray-900 hover:text-indigo-500 transition" size={24} />
          </a>
          <a href="https://chat.whatsapp.com/DYl8T4Iuimw6WZ3WWcZD3W" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-gray-900 hover:text-indigo-500 transition" size={24} />
          </a>
          <a href="https://instagram.com/your-instagram-link" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-gray-900 hover:text-indigo-500 transition" size={24} />
          </a>
          <a href="https://facebook.com/your-facebook-link" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-gray-900 hover:text-indigo-500 transition" size={24} />
          </a>
          {user ? (
              <div className="relative">
              {/* <img
                id="avatarButton"
                className="w-10 h-8 rounded-full cursor-pointer"
                style={{marginTop:"-4px",marginLeft:"-2px"}}
                src="/assets/images/profile.png"
                alt="User dropdown"
                onClick={toggleDropdown}
              /> */}
                <FaUser className="text-gray-900 hover:text-indigo-500 transition" size={24} onClick={toggleDropdown} />
              {isDropdownOpen && (
                <div
                  id="userDropdown"
                  className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44"
                >
                  <div className="px-4 py-3 text-sm text-gray-900">
                    <div>{user.data.username}</div>
                    <div className="font-medium truncate">{user.data.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700">
                  <ul className="py-2 text-sm text-gray-700">
  <li>
    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
      User Profile
    </Link>
  </li>
</ul>

                  </ul>
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"     
                      onClick={signOut}
                      >
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => openModal(true)} className="font-bold text-gray-900 hover:text-indigo-500 transition">
              Login
            </button>
          )}
        </div>
      </header>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-8 flex flex-col items-center">
            {isForgetPassword ? (
              <ForgetPassword onClose={closeModal} />
            ) : isSignIn ? (
              <SignIn onClose={closeModal} onSwitchToSignUp={() => openModal(false)} onForgotPassword={openForgetPassword} onLogin={handleLogin} />
            ) : (
              <SignUp onClose={closeModal} onSwitchToSignIn={() => openModal(true)}/>
            )}
          </div>
        </div>
      )}
    </>
  );
};
