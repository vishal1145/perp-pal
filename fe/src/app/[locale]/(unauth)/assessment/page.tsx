import React from 'react' 
import DropdownSearch from '@/components/Multiselect'
import { Bloom, CreatePaper, Difficulty, ExamSetup, Length, Marks, Nature, TextBook } from '@/data/multiSelectData'
import Question from '@/components/Question'
// import { DemoBanner } from '@/components/DemoBanner'
const Assesment = () => {

    return (
        <>
        
{/* <DemoBanner notMainPage={true}/> */}

        <div className=' '>
            <button
                data-drawer-target="sidebar-multi-level-sidebar"
                data-drawer-toggle="sidebar-multi-level-sidebar"
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-360 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    />
                </svg>
            </button>
            <aside
                id="sidebar-multi-level-sidebar "
                className="fixed p-4   left-0 z-36 w-1/4 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 rounded-md py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800" id="scrollable-container">
                    <ul className="space-y-2 font-medium">
                     
  

<li>
                            <DropdownSearch filter={CreatePaper.filter} options={CreatePaper.options}/>
                        </li>


                        <li>
                            <DropdownSearch filter={ExamSetup.filter} options={ExamSetup.options}/>
                        </li>

                        <li>
                            <DropdownSearch filter={TextBook.filter} options={TextBook.options}/>
                        </li>



                        <li>
                            <DropdownSearch filter={TextBook.filter} options={TextBook.options}/>
                        </li>

                        <li>
                            <DropdownSearch filter={Marks.filter} options={Marks.options}/>
                        </li>

                        <li>
                            <DropdownSearch filter={Nature.filter} options={Nature.options}/>
                        </li>

                        <li>
                            <DropdownSearch filter={Length.filter} options={Length.options}/>
                        </li>

                        
                        <li>
                            <DropdownSearch filter={Bloom.filter} options={Bloom.options}/>
                        </li>

                        <li>
                            <DropdownSearch filter={Difficulty.filter} options={Difficulty.options}/>
                        </li>

                        



                    </ul>
                </div>
            </aside> 



            <div id='assessment-right-9-col'  className='bg-white grid grid-cols-9' style={{marginLeft:"25.1%"}}>
           
         
   


           
                <div className="py-4 px-2 col-span-6">
                    <div className="flex items-center justify-center h-42   mb-4 dark:bg-gray-800">
                    <Question />
                    </div>

                    <div className="flex items-center justify-center h-42 mt-6 mb-4 dark:bg-gray-800">
                    <Question />
                    </div>

                    <div className="flex items-center justify-center h-42 mt-6 mb-4 dark:bg-gray-800">
                    <Question />
                    </div>


                    <div className="flex items-center justify-center h-42 mt-6 mb-4 dark:bg-gray-800">
                    <Question />
                    </div>

                    <div className="flex items-center justify-center h-42 mt-6 mb-4 dark:bg-gray-800">
                    <Question />
                    </div>
                </div>


                <section className="pt-4 px-2 col-span-3">
  <div className="  p-2 ">
    <div className=" ">
      <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
        Frequently asked questions
      </h2>
    </div>
    <div className="accordion-group" data-accordion="default-accordion">
      <div
        className="accordion border border-solid border-gray-300 p-4 rounded-xl transition duration-500 accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4 active"
        id="basic-heading-one-with-icon"
      >
        <button
          className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
          aria-controls="basic-collapse-one-with-icon"
        >
          <h5>How can I reset my password?</h5>
          <svg
            className="w-6 h-6 text-gray-900 transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600 origin-center"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H18M12 18V6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="w-6 h-6 text-gray-900 transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          id="basic-collapse-one-with-icon"
          className="accordion-content w-full overflow-hidden pr-4"
          aria-labelledby="basic-heading-one"
          style={{ maxHeight: 250 }}
        >
          <p className="text-base text-gray-900 font-normal leading-6">
            To create an account, find the 'Sign up' or 'Create account' button,
            fill out the registration form with your personal information, and
            click 'Create account' or 'Sign up.' Verify your email address if
            needed, and then log in to start using the platform.
          </p>
        </div>
      </div>
      <div
        className="accordion border border-solid border-gray-300 p-4 rounded-xl accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4"
        id="basic-heading-two-with-icon"
      >
        <button
          className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
          aria-controls="basic-collapse-two-with-icon"
        >
          <h5>How do I update my billing information?</h5>
          <svg
            className="w-6 h-6 text-gray-900 transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H18M12 18V6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="w-6 h-6 text-gray-900 transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          id="basic-collapse-two-with-icon"
          className="accordion-content w-full overflow-hidden pr-4"
          aria-labelledby="basic-heading-two"
        >
          <p className="text-base text-gray-900 font-normal leading-6">
            To create an account, find the 'Sign up' or 'Create account' button,
            fill out the registration form with your personal information, and
            click 'Create account' or 'Sign up.' Verify your email address if
            needed, and then log in to start using the platform.
          </p>
        </div>
      </div>
      <div
        className="accordion border border-solid border-gray-300 p-4 rounded-xl accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4"
        id="basic-heading-three-with-icon"
      >
        <button
          className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
          aria-controls="basic-collapse-three-with-icon"
        >
          <h5>How can I contact customer support?</h5>
          <svg
            className="w-6 h-6 text-gray-900 transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H18M12 18V6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="w-6 h-6 text-gray-900 transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          id="basic-collapse-three-with-icon"
          className="accordion-content w-full overflow-hidden pr-4"
          aria-labelledby="basic-heading-three"
        >
          <p className="text-base text-gray-900 font-normal leading-6">
            To create an account, find the 'Sign up' or 'Create account' button,
            fill out the registration form with your personal information, and
            click 'Create account' or 'Sign up.' Verify your email address if
            needed, and then log in to start using the platform.
          </p>
        </div>
      </div>
      <div
        className="accordion border border-solid border-gray-300 p-4 rounded-xl accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4"
        id="basic-heading-three-with-icon"
      >
        <button
          className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
          aria-controls="basic-collapse-three-with-icon"
        >
          <h5>How do I delete my account?</h5>
          <svg
            className="w-6 h-6 text-gray-900 transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H18M12 18V6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="w-6 h-6 text-gray-900 transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          id="basic-collapse-three-with-icon"
          className="accordion-content w-full overflow-hidden pr-4"
          aria-labelledby="basic-heading-three"
        >
          <p className="text-base text-gray-900 font-normal leading-6">
            To create an account, find the 'Sign up' or 'Create account' button,
            fill out the registration form with your personal information, and
            click 'Create account' or 'Sign up.' Verify your email address if
            needed, and then log in to start using the platform.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
</div> 
            </div>



      
     </>
    )
}

export default Assesment