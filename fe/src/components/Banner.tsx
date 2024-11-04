import Link from 'next/link';
import { useState } from 'react';
import { FaSearch, FaTelegramPlane, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import SignUp from '@/app/[locale]/(unauth)/signUp/page';
interface DemoBannerProps {
  notMainPage: boolean;
}

export const Banner: React.FC<DemoBannerProps> = (props) => {
  const { notMainPage } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
    <header className="sticky top-0 z-50 bg-white p-4 text-lg font-normal text-gray-900 flex items-center justify-between ">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-8">
          <ul className="flex space-x-4">
            <li>
              <Link href="/how-it-work" className="hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                <p className="text-base text-gray-900">How It Works</p>
              </Link>
            </li>
            {/* <li>
              <Link href="/blog" className="hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                <p className="text-base text-gray-900">Blog</p>
              </Link>
            </li> */}
          </ul>
        </div>
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
      <div className="flex space-x-5 ml-4">
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
        <button
            onClick={openModal}
            className="font-bold text-gray-900 hover:text-indigo-500 transition"
          >
            Login
          </button>
      </div>
      
    </header>
    {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-8 flex flex-col items-centern ">
    {/* <button
  className="absolute  right-2 text-gray-500 hover:text-gray-700 z-20"
  style={{top:"-185px"}}
  onClick={closeModal}
>
  &times;
</button> */}

      <SignUp onClose={closeModal}/>
    </div>
  </div>
)}

</>
  );
};
