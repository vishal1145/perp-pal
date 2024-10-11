import Link from 'next/link';
import { FaSearch, FaTelegramPlane, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

interface DemoBannerProps {
  notMainPage: boolean;
}

export const Banner: React.FC<DemoBannerProps> = (props) => {
  const { notMainPage } = props;

  return (
    <header className="sticky top-0 z-50 bg-white p-4 text-lg font-normal text-gray-900 flex items-center justify-between ">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-8">
          <ul className="flex space-x-4">
            <li>
              <Link href="/how-it-work" className="hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                <p className="text-base text-gray-900">How It Works</p>
              </Link>
            </li>
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
        <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="text-gray-900 hover:text-indigo-500 transition" size={24} />
        </a>
        <a href="https://instagram.com/your-instagram-link" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-gray-900 hover:text-indigo-500 transition" size={24} />
        </a>
        <a href="https://facebook.com/your-facebook-link" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-gray-900 hover:text-indigo-500 transition" size={24} />
        </a>
      </div>
    </header>
  );
};
