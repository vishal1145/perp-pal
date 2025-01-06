'use client';
import React, { useState } from 'react';
import { Banner } from '@/components/Banner';
import Linkdin from '../../../../../public/svgs/linkdin.svg'
import Youtube from '../../../../../public/svgs/youtube.svg'
import Facebokk from '../../../../../public/svgs/facebook.svg'
import Teligram from '../../../../../public/svgs/teligram.svg'
import Whatsapp from '../../../../../public/svgs/whatsapp.svg'

const Page = () => {
    const [loadingUserData, setLoadingUserData] = useState('');

    return (
        <>
            <Banner notMainPage={true} loadingUserData={loadingUserData} />
            <div className="min-h-screen bg-blue-50">
                <div className=' px-24  '>

                    <div className="w-full  pt-8">

                        {/* <div className="text-sm text-blue-500 mb-4 flex ">
                            <p>Home</p> {' > '} <p>Class 12</p> {' > '} <p>BIOLOGY</p>
                        </div> */}

                        <div className="flex flex-col md:flex-row gap-16 items-center justify-center w-[100%]">
                            <div className='w-[70%]'>
                                <h1 className="text-3xl font-sans text-gray-800 font-semibold">
                                    Ncert Solutions for Class 12 BIOLOGY
                                </h1>
                                <p className="mt-4 text-gray-600 text-lg">
                                    NCERT Solutions for Class 12 BIOLOGY aims to help a student develop a comprehensive conceptual understanding of all the topics included in the CBSE Class 12 BIOLOGY Syllabus. The CBSE Class 12 BIOLOGY NCERT Solutions is important for Class 12th board exams preparation. NCERT Solutions for Class 12 BIOLOGY will help you score excellent marks in CBSE Class 12 board exams and help you qualify the engineering entrance exams such as <span className="font-semibold">JEE Main, JEE Advanced, BITSAT, VITEEE, SRMJEEE</span> etc.
                                </p>
                                <div className="mt-6">
                                    <table className="w-full border border-gray-300 text-left text-gray-600">
                                        <tbody>
                                            <tr className="border-b border-gray-300">
                                                <th className="p-3 font-medium text-gray-700">Class</th>
                                                <td className="p-3 border border-gray-300">12</td>
                                            </tr>
                                            <tr className="border-b border-gray-300">
                                                <th className="p-3 font-medium text-gray-700">Subject</th>
                                                <td className="p-3 border border-gray-300">BIOLOGY</td>
                                            </tr>
                                            <tr className="border-b border-gray-300">
                                                <th className="p-3 font-medium text-gray-700">Number of Chapters</th>
                                                <td className="p-3 border border-gray-300">16</td>
                                            </tr>
                                            <tr className="border-b border-gray-300">
                                                <th className="p-3 font-medium text-gray-700">Medium</th>
                                                <td className="p-3 border border-gray-300">English</td>
                                            </tr>
                                            <tr>
                                                <th className="p-3 font-medium text-gray-700">Academic Year</th>
                                                <td className="p-3 border border-gray-300">2023–2024</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mt-5 '>
                                    <h2 className='text-3xl font-sans font-semibold'>Ncert Syllabus for Class 12 BIOLOGY</h2>
                                    <ul className="list-none py-5 text-gray-500">
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 1:</span>
                                                <a className="link" href="/className-12/chemistry/solid-state">THE SOLID STATE</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 2:</span>
                                                <a className="link" href="/className-12/chemistry/solutions">SOLUTION</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 3:</span>
                                                <a className="link" href="/className-12/chemistry/electrochemistry">ELECTROCHEMISTRY</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 4:</span>
                                                <a className="link" href="/className-12/chemistry/chemical-kinetics">CHEMICAL KINETICS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 5:</span>
                                                <a className="link" href="/className-12/chemistry/surface-chemistry">SURFACE CHEMISTRY</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 6:</span>
                                                <a className="link" href="/className-12/chemistry/general-principles-and-processes-of-isolation-of-elements">GENERAL PRINCIPLES AND PROCESSESS OF ISOLATION OF ELEMENTS </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 7:</span>
                                                <a className="link" href="/className-12/chemistry/p-block-elements">THE P-BLOCK ELEMENTS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 8:</span>
                                                <a className="link" href="/className-12/chemistry/d-and-f-block-elements">THE D AND F BLOCK ELEMENTS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 9:</span>
                                                <a className="link" href="/className-12/chemistry/coordination-compounds">COORDINATION COMPOUNDS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 10:</span>
                                                <a className="link" href="/className-12/chemistry/haloalkanes-and-haloarenes">HALOALKANES AND HALOARENES</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 11:</span>
                                                <a className="link" href="/className-12/chemistry/alcohols-phenols-and-ethers">ALCOHOLS, PHENOLS AND ETHERS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 12:</span>
                                                <a className="link" href="/className-12/chemistry/aldehydes-ketones-and-carboxylic-acids">ALDEHYDES, KETONES AND CARBOXYLIC ACIDS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 13:</span>
                                                <a className="link" href="/className-12/chemistry/amines">AMINES</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 14:</span>
                                                <a className="link" href="/className-12/chemistry/biomolecules">BIOMOLECULES</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 15:</span>
                                                <a className="link" href="/className-12/chemistry/polymers">POLYMERS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="text-base font-normal w-24 shrink-0">Chapter 16:</span>
                                                <a className="link" href="/className-12/chemistry/chemistry-in-everyday-life">CHEMISTRY IN EVERYDAY LIFE</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <div className="mt-0">
                                    <h2 className="text-3xl text-gray-800">Other subjects for Class 12</h2>
                                    <ul className="mt-4 text-gray-600 space-y-2 font-semibold">
                                        <li>Ncert Solutions for Class 12 MATHS</li>
                                        <li>Ncert Solutions for Class 12 PHYSICS</li>
                                        <li>Ncert Solutions for Class 12 CHEMISTRY</li>
                                        <li>Ncert Solutions for Class 12 HINDI</li>
                                        <li>Ncert Solutions for Class 12 ENGLISH</li>
                                    </ul>
                                    <h2 className="text-3xl text-gray-800 mt-8">Other classes for BIOLOGY</h2>
                                    <ul className="mt-4 text-gray-600 space-y-2 font-semibold">
                                        <li>Ncert Solutions for Class 6 BIOLOGY</li>
                                        <li>Ncert Solutions for Class 7 BIOLOGY</li>
                                        <li>Ncert Solutions for Class 8 BIOLOGY</li>
                                        <li>Ncert Solutions for Class 9 BIOLOGY</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <section className="flex flex-wrap items-center justify-center pt-4 pb-4 gap-8 text-xl mb-0">
                            <div className='border-2 border-black p-2 rounded-full'>
                                <Linkdin width={22} height={22} strokeWidth={2} className="text-blue-600 " />
                            </div>
                            <div className='border-2 border-black p-2 rounded-full'>
                                <Facebokk width={22} height={22} strokeWidth={2} className="text-blue-600 " />
                            </div>
                            <div className='border-2 border-black p-2 rounded-full'>
                                <Youtube width={22} height={22} strokeWidth={2} className="text-blue-600 " />
                            </div>
                            <div className='border-2 border-black p-2 rounded-full'>
                                <Teligram width={22} height={22} strokeWidth={2} className="text-blue-600 " />
                            </div>
                            <div className='border-2 border-black p-2 rounded-full'>
                                <Whatsapp width={22} height={22} strokeWidth={2} className="text-blue-600 " />
                            </div>
                        </section>
                    </div>
                </div>
                <hr className='mt-3' />
                <footer className='px-4'>
                    <div className="columns-3xs gap-8 space-y-8 mt-5">
                        <section className="mb-6 break-inside-avoid-column text-left">
                            <h6 className="uppercase font-bold mb-3 text-xl">Exams</h6>
                            <ul className="text-sm pl-0 list-none list-inside text-gray-500">
                                <li className="pl-0 py-0.5">IIT JEE</li>
                                <li className="pl-0 py-0.5">NEET</li>
                                <li className="pl-0 py-0.5">UP Board</li>
                                <li className="pl-0 py-0.5">Bihar Board</li>
                                <li className="pl-0 py-0.5">CBSE</li>
                            </ul>
                        </section>
                        <section className="mb-6 break-inside-avoid-column text-left">
                            <h6 className="uppercase font-bold mb-3 text-xl">Free Textbook Solutions</h6>
                            <ul className="text-sm pl-0 list-none list-inside text-gray-500">
                                <li className="pl-0 py-0.5  ">KC Sinha Solutions for Maths</li>
                                <li className="pl-0 py-0.5  ">Cengage Solutions for Maths</li>
                                <li className="pl-0 py-0.5  ">DC Pandey Solutions for Physics</li>
                                <li className="pl-0 py-0.5  ">HC Verma Solutions for Physics</li>
                                <li className="pl-0 py-0.5  ">Sunil Batra Solutions for Physics</li>
                                <li className="pl-0 py-0.5  ">Pradeep Solutions for Physics</li>
                                <li className="pl-0 py-0.5  ">Errorless Solutions for Physics</li>
                                <li className="pl-0 py-0.5  ">Narendra Awasthi Solutions for Chemistry</li>
                                <li className="pl-0 py-0.5  ">MS Chouhan Solutions for Chemistry</li>
                                <li className="pl-0 py-0.5  ">Errorless Solutions for Biology</li>
                            </ul>
                        </section>
                        <section className="mb-6 break-inside-avoid-column text-left">
                            <h6 className="uppercase font-bold mb-3 text-xl">Free Ncert Solutions English Medium</h6>
                            <ul className="text-sm pl-0 list-none list-inside text-gray-500">
                                <li className="pl-0 py-0.5 ">NCERT Solutions</li>
                                <li className="pl-0 py-0.5 ">NCERT Solutions for Class 12 English Medium</li>
                                <li className="pl-0 py-0.5 ">NCERT Solutions for Class 11 English Medium</li>
                                <li className="pl-0 py-0.5 ">NCERT Solutions for Class 10 English Medium</li>
                                <li className="pl-0 py-0.5 ">NCERT Solutions for Class 9 English Medium</li>
                                <li className="pl-0 py-0.5 ">NCERT Solutions for Class 8 English Medium</li>
                                <li className="pl-0 py-0.5 ">NCERT Solutions for Class 7 English Medium</li>
                                <li className="pl-0 py-0.5 ">NCERT Solutions for Class 6 English Medium</li>
                            </ul>
                        </section>
                        <section className="mb-6 break-inside-avoid-column text-left">
                            <h6 className="uppercase font-bold mb-3 text-xl">Free Ncert Solutions Hindi Medium</h6>
                            <ul className="text-sm pl-0 list-none list-inside text-gray-500">
                                <li className="pl-0 py-0.5">NCERT Solutions</li>
                                <li className="pl-0 py-0.5">NCERT Solutions for Class 12 Hindi Medium</li>
                                <li className="pl-0 py-0.5">NCERT Solutions for Class 11 Hindi Medium</li>
                                <li className="pl-0 py-0.5">NCERT Solutions for Class 10 Hindi Medium</li>
                                <li className="pl-0 py-0.5">NCERT Solutions for Class 9 Hindi Medium</li>
                                <li className="pl-0 py-0.5">NCERT Solutions for Class 8 Hindi Medium</li>
                                <li className="pl-0 py-0.5">NCERT Solutions for Class 7 Hindi Medium</li>
                                <li className="pl-0 py-0.5">NCERT Solutions for Class 6 Hindi Medium</li>
                            </ul>
                        </section>
                        <section className="mb-6 break-inside-avoid-column text-left">
                            <h6 className="uppercase font-bold mb-3 text-xl">Boards</h6>
                            <ul className="text-sm pl-0 list-none list-inside text-gray-500">
                                <li className="pl-0 py-0.5 ">CBSE</li>
                                <li className="pl-0 py-0.5 ">UP Board</li>
                                <li className="pl-0 py-0.5 ">Bihar Board</li>
                                <li className="pl-0 py-0.5 ">UP Board</li>
                            </ul>
                        </section>
                        <section className="mb-6 break-inside-avoid-column text-left">
                            <h6 className="uppercase font-bold mb-3 text-xl ">Resources</h6>
                            <ul className="text-sm pl-0 list-none list-inside text-gray-500">
                                <li className="pl-0 py-0.5 ">Unit Converters</li>
                                <li className="pl-0 py-0.5 ">Calculators</li>
                                <li className="pl-0 py-0.5 ">Books Store</li>
                                <li className="pl-0 py-0.5 ">Seminar</li>
                                <li className="pl-0 py-0.5 ">Results</li>
                                <li className="pl-0 py-0.5 ">Search Doubtnut</li>
                                <li className="pl-0 py-0.5 ">Blogs</li>
                                <li className="pl-0 py-0.5 ">Class 12 All Books</li>
                                <li className="pl-0 py-0.5 ">Class 11 All Books</li>
                                <li className="pl-0 py-0.5 ">Class 10 All Books</li>
                                <li className="pl-0 py-0.5 ">Class 9 All Books</li>
                                <li className="pl-0 py-0.5 ">Class 8 All Books</li>
                                <li className="pl-0 py-0.5 ">Class 7 All Books</li>
                                <li className="pl-0 py-0.5 ">Class 6 All Books</li>
                            </ul>
                        </section>

                    </div>

                    <hr className='mt-3 mb-7' />
                    <div className="grid grid-cols-2 grid-flow-row gap-10 mt-5">
                        <div className='col-span-2 lg:col-span-1 text-left text-gray-600'>
                            <p>Doubtnut is No.1 Study App and Learning App with Instant Video Solutions for NCERT Class 6, Class 7, Class 8, Class 9, Class 10, Class 11 and Class 12, IIT JEE prep, NEET preparation and CBSE, UP Board, Bihar Board, Rajasthan Board, MP Board, Telangana Board etc <br />NCERT solutions for CBSE and other state boards is a key requirement for students. Doubtnut helps with homework, doubts and solutions to all the questions. It has helped students get under AIR 100 in NEET &amp; IIT JEE. Get PDF and video solutions of IIT-JEE Mains &amp; Advanced previous year papers, NEET previous year papers, NCERT books for classes 6 to 12, CBSE, Pathfinder Publications, RD Sharma, RS Aggarwal, Manohar Ray, Cengage books for boards and competitive exams.<br />Doubtnut is the perfect NEET and IIT JEE preparation App. Get solutions for NEET and IIT JEE previous years papers, along with chapter wise NEET MCQ solutions. Get all the study material in Hindi medium and English medium for IIT JEE and NEET preparation</p>
                        </div>
                        <div className="col-span-2 lg:col-span-1 text-left ">
                            <h6 className="uppercase font-semibold md:justify-start text-xl font-sans mb-7">Contact Us</h6>
                            <ul className="pl-0 flex flex-col gap-1 text-gray-600 ">
                                <li className="flex md:justify-start items-center space-x-4">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house-chimney" className="" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21.71 8.62L15.88 4.08C14.16 2.74 13.22 2 12 2C10.78 2 9.84001 2.74 8.12001 4.08L2.29001 8.62C1.96001 8.87 1.90001 9.35 2.16001 9.67C2.41001 9.99 2.86001 10.05 3.19001 9.81V17.34C3.19001 19.91 5.28001 22 7.84001 22H8.65001C9.59282 22 10.0642 22 10.3571 21.7071C10.65 21.4142 10.65 20.9428 10.65 20V14.91C10.65 14.17 11.25 13.57 11.99 13.57C12.73 13.57 13.33 14.17 13.33 14.91V20C13.33 20.9428 13.33 21.4142 13.6229 21.7071C13.9158 22 14.3872 22 15.33 22H15.95C18.51 22 20.6 19.91 20.6 17.35V9.65L20.79 9.8C20.93 9.91 21.09 9.96 21.25 9.96C21.47 9.96 21.69 9.86 21.84 9.67C22.09 9.34 22.04 8.87 21.71 8.62Z" fill="currentColor"></path></svg>
                                    <span>ALLEN CAREER INSTITUTE PRIVATE LIMITED, Plot No. 13 &amp; 14, Dabra Road, Sector 13, Hisar, Haryana 125001</span>
                                </li>
                                <li className="flex md:justify-start items-center space-x-4 mt-3">
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="envelope"
                                        className="svg-inline--fa fa-envelope"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        width="24"
                                        height="24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                                        ></path>
                                    </svg>


                                    <a className=" link font-semibold" href="mailto:info@doubtnut.com">info@doubtnut.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr className='my-4' />
                    <div>
                        <ul className="list-none pl-0 pb-28 lg:pb-2 flex justify-center flex-wrap text-lg font-semibold text-gray-600">
                            <li>
                                <a className=" link space-x-2 shrink-0 px-2" target="_blank" href="/terms-and-conditions">Terms &amp; Conditions</a>
                            </li>
                            <li> | </li>
                            <li>
                                <a className=" link space-x-2 shrink-0 px-2" target="_blank" href="/payment-terms">Payment Terms</a>
                            </li>
                            <li>|</li>
                            <li>
                                <a className=" link space-x-2 shrink-0 px-2" target="_blank" href="/privacy-policy">Privacy Policy</a>
                            </li>
                            <li>|</li>
                            <li>
                                <a className=" link space-x-2 shrink-0 px-2" target="_blank" href="/contact-us">Contact Us</a>
                            </li>
                            <li>|</li>
                            <li>
                                <a className=" link space-x-2 shrink-0 px-2" target="_blank" href="/about-us">About Us</a>
                            </li>
                            <li>|</li>
                            <li>
                                <span className='px-2'>©2024 Copyright @Doubtnut</span>

                            </li>
                        </ul>

                    </div>
                </footer>
            </div>

        </>
    );
};

export default Page;
