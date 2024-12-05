import { text1, text2 } from '@/data/data';
import Image from 'next/image';
import { FaBell } from 'react-icons/fa';
import img1 from "../images/assessment.png"
import fb from "../images/facebook.png"
import whats from "../images/whatsapp.png"
type SharePreppalProps = {
  setSharePreppal: (value: boolean) => void;
};
 
const SharePreppal: React.FC<SharePreppalProps> = ({ setSharePreppal }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative px-4 pt-4 w-full max-w-2xl max-h-full">
    <button
      type="button"
      className="absolute top-5 right-5 text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center   z-10"
      onClick={() => {
        setSharePreppal(false);
      }}
    >
      <svg
        className="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>

        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className='flex items-center justify-center w-full'>
            <Image
              src={img1}
              className='h-10 w-10 mt-8'
              alt='img1'
            />
          </div>

          <div className="p-[20px] text-center">
            <p className={`${text1} `}>
              Did we make paper better for you?
            </p>
            <p className={`${text2} pt-[14px]`}>
              Your feedback is valuable to us. A review not only helps improve our service but also enables us to continue offering free access to students and users like you. If you find our platform helpful, kindly consider sharing your thoughts with others.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-16 pb-[24px] pt-[4px]'>
  <div className="flex flex-col items-center mb-6 sm:mb-0"> 
    <Image
      src={fb}
      className='h-10 w-10 mb-4'
      alt='Facebook Icon'
    />
    <button
      className="mb-2 cursor-pointer rounded-lg border border-gray-500 bg-transparent px-5 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none "
      style={{
        border: "1px solid rgb(226, 226, 226)",
        color: "rgb(107 114 128)",
      }}
    >
      Share on Facebook
    </button>
  </div>

  <div className="h-28 w-px bg-gray-300 sm:block hidden"></div>

  <div className="flex flex-col items-center">
    <Image
      src={whats}
      className='h-10 w-10 mb-4'
      alt='WhatsApp Icon'
    />
    <button className="mb-2   cursor-pointer rounded-lg border border-gray-500 bg-transparent px-5 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none "
      style={{
        border: "1px solid rgb(226, 226, 226)",
        color: "rgb(107 114 128)",
      }}>
      Share on WhatsApp
    </button>
  </div>
</div>

          <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <div className='flex flex-col sm:flex-row   gap-[14px] sm:gap-1'>
              <div className={` ${text2} text-center`}>
                Not happy with Preppal? Our team is all ears.
              </div>
              <button className="text-sm  text-cyan-600 hover:text-cyan-700">
                Contact Support
              </button>
            </div>

            <div className="mt-3 md:mt-0 flex items-center gap-2">
              <div className={`${text2} flex items-center gap-2`}>
                Remind me later <FaBell className='text-cyan-600 hover:text-cyan-700 cursor-pointer' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePreppal;