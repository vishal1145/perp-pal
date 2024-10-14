import React from 'react';

type SubmitPopupProps = {
    title: string;
    message: string;
    setIsModalOpen: (open: boolean) => void;  
    submitBtn: string;
    submitFn:()=>void;
  };
  
  const SubmitPopup: React.FC<SubmitPopupProps> = ({ title, message, setIsModalOpen, submitBtn, submitFn }) => {

  const closeModal = ()=>{
    setIsModalOpen(false);
  }
  
 
  return (
        <div
          className="fixed top-0 left-0 z-[80] w-full h-full overflow-hidden bg-black bg-opacity-50"
          role="dialog"
          aria-labelledby="modal-label"
          tabIndex={-1}
        >
          <div className="flex items-center justify-center h-full">
            <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl m-3 sm:max-w-lg sm:w-full">
              <div className="flex justify-between items-center py-3 px-4 border-b">
                <h3
                  id="modal-label"
                  className="text-sm font-medium text-black"
                >
                  {title}
                </h3>
                <button
                  type="button"
                  className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">
                {message}
                </p>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
                  style={{
                  border:"1px solid rgb(226, 226, 226)",
                  color:"rgb(107 114 128)"
                   }} 
                   onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 hover:bg-blue-700 focus:outline-none"
                  onClick={submitFn}
                >
                  {submitBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
  );
};

export default SubmitPopup;