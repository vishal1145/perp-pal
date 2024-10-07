import React from 'react'
import examIcon from '../../../../images/exam.png'
import examIcon2 from '../../../../images/exam2.png'
import Image from 'next/image'
import DropdownSearch from '@/components/Multiselect'
import { Bloom, Difficulty, ExamSetup, Length, Marks, Nature, TextBook } from '@/data/multiSelectData'
import Question from '@/components/Question'
import { DemoBanner } from '@/components/DemoBanner'
const Assesment = () => {

    return (
        <>
        
<DemoBanner notMainPage={true}/>

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
                id="sidebar-multi-level-sidebar"
                className="fixed   left-0 z-36 w-1/4 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800" id="scrollable-container">
                    <ul className="space-y-2 font-medium">
                        {/* <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <Image src={examIcon} alt="Exam Icon" height={36} width={36} />
                                <span className="ms-3">Create Paper</span>
                            </a> */}
                        {/* </li> */}

                        {/* <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <Image src={examIcon} alt="Exam Icon" height={36} width={36} />
                                <span className="ms-3">Create MCQ Paper</span>
                            </a>
                        </li>
                        */}

                        {/* <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-md group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                            >
                                <Image src={examIcon2} alt="Exam Icon" height={36} width={36} />
                                <span className="flex-1 ms-1 text-left rtl:text-right whitespace-nowrap">
                                    Exam Setup
                                </span>
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            <ul id="dropdown-example" className="hidden py-2 space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Products
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Billing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Invoice
                                    </a>
                                </li>
                            </ul>
                        </li> */}
                      <button
  id="dropdownSearchButton"
  // onClick={toggleDropdown}
  className="text-black focus:outline-none font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center justify-between w-full"
  type="button"
>
  <span className=" ">{"Create Paper"}</span>
  <svg
    className="w-2.5 h-2.5 ms-3"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 6"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 1 4 4 4-4"
    />
  </svg>
</button>


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
            <div id='assessment-right-9-col' className='bg-white' style={{marginLeft:"25.1%"}}>
                <div className="p-4">
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
            </div>
        </div>
     </>
    )
}

export default Assesment