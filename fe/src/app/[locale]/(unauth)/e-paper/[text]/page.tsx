"use client"
import React from 'react'
import DropdownSearch from '@/components/Multiselect'
import { Bloom, CreatePaper, Difficulty, ExamSetup, Length, Marks, Nature, TextBook } from '@/data/multiSelectData'
import Question from '@/components/Question'
import { DemoBanner } from '@/components/DemoBanner'
import Faq from '@/components/FAQ/Faq'
import { useRouter } from 'next/navigation';
const Assesment = ({ params }: { params: { promptText: string } }) => {
  const router = useRouter();
  const { promptText} = params;
  return (
    <>
  
      <DemoBanner notMainPage={true} />

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
                <DropdownSearch filter={CreatePaper.filter} options={CreatePaper.options} />
              </li>


              <li>
                <DropdownSearch filter={ExamSetup.filter} options={ExamSetup.options} />
              </li>

              <li>
                <DropdownSearch filter={TextBook.filter} options={TextBook.options} />
              </li>



              <li>
                <DropdownSearch filter={TextBook.filter} options={TextBook.options} />
              </li>

              <li>
                <DropdownSearch filter={Marks.filter} options={Marks.options} />
              </li>

              <li>
                <DropdownSearch filter={Nature.filter} options={Nature.options} />
              </li>

              <li>
                <DropdownSearch filter={Length.filter} options={Length.options} />
              </li>


              <li>
                <DropdownSearch filter={Bloom.filter} options={Bloom.options} />
              </li>

              <li>
                <DropdownSearch filter={Difficulty.filter} options={Difficulty.options} />
              </li>


            </ul>
          </div>
        </aside>






        <div id='assessment-right-9-col' className='bg-white grid grid-cols-9' style={{ marginLeft: "24.5%" }}>

  

          <div className=" p-4  sm:col-span-9  md:col-span-9 lg:col-span-6">
            <div>
              Title
            </div>

            <div className='text-gray-500'>
               Subtitle
            </div>
            <div className="mb-4 dark:bg-gray-800 mt-3">
              <Question />
              <Question />
              <Question />
            </div>



            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full"
            >
              Practice
            </button>
          </div>


          <Faq />

        </div>
      </div>




    </>
  )
}

export default Assesment