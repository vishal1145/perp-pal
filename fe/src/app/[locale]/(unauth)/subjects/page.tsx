'use client';
import React, { useState } from 'react';
import { Banner } from '@/components/Banner';

const Page = () => {
    const [loadingUserData, setLoadingUserData] = useState('');

    return (
        <div className="min-h-screen bg-blue-50 ">
            <Banner notMainPage={true} loadingUserData={loadingUserData} />

            <div className="max-w-7xl mx-auto mt-8">

                <div className="text-sm text-blue-500 mb-4">
                    <span>Home</span> {' > '} <span>Class 12</span> {' > '} <span>BIOLOGY</span>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-[100%]">
                    <div className='w-[75%]'>
                        <h1 className="text-3xl font-sans text-gray-800 font-semibold">
                            Ncert Solutions for Class 12 BIOLOGY
                        </h1>
                        <p className="mt-4 text-gray-600">
                            NCERT Solutions for Class 12 BIOLOGY aims to help a student develop a comprehensive conceptual understanding of all the topics included in the CBSE Class 12 BIOLOGY Syllabus. The CBSE Class 12 BIOLOGY NCERT Solutions is important for Class 12th board exams preparation. NCERT Solutions for Class 12 BIOLOGY will help you score excellent marks in CBSE Class 12 board exams and help you qualify the engineering entrance exams such as <span className="font-semibold">JEE Main, JEE Advanced, BITSAT, VITEEE, SRMJEEE</span> etc.
                        </p>


                        <div className="mt-6">
                            <table className="w-full border border-gray-300 text-left">
                                <tbody>
                                    <tr className="border-b border-gray-300">
                                        <th className="p-3 font-medium text-gray-700">Class</th>
                                        <td className="p-3">12</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <th className="p-3 font-medium text-gray-700">Subject</th>
                                        <td className="p-3">BIOLOGY</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <th className="p-3 font-medium text-gray-700">Number of Chapters</th>
                                        <td className="p-3">16</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <th className="p-3 font-medium text-gray-700">Medium</th>
                                        <td className="p-3">English</td>
                                    </tr>
                                    <tr>
                                        <th className="p-3 font-medium text-gray-700">Academic Year</th>
                                        <td className="p-3">2023–2024</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className='mt-5 '>
                            <h2 className='text-3xl font-sans font-semibold'>Ncert Syllabus for Class 12 BIOLOGY</h2>
                            <ul className="list-none py-5">
                                <li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 1:</span><a className="link" href="/className-12/chemistry/solid-state">THE SOLID STATE</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 2:</span><a className="link" href="/className-12/chemistry/solutions">SOLUTION</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 3:</span><a className="link" href="/className-12/chemistry/electrochemistry">ELECTROCHEMISTRY</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 4:</span><a className="link" href="/className-12/chemistry/chemical-kinetics">CHEMICAL KINETICS</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 5:</span><a className="link" href="/className-12/chemistry/surface-chemistry">SURFACE CHEMISTRY</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 6:</span><a className="link" href="/className-12/chemistry/general-principles-and-processes-of-isolation-of-elements">GENERAL PRINCIPLES AND PROCESSESS OF ISOLATION OF ELEMENTS </a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 7:</span><a className="link" href="/className-12/chemistry/p-block-elements">THE P-BLOCK ELEMENTS</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 8:</span><a className="link" href="/className-12/chemistry/d-and-f-block-elements">THE D AND F BLOCK ELEMENTS</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 9:</span><a className="link" href="/className-12/chemistry/coordination-compounds">COORDINATION COMPOUNDS</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 10:</span><a className="link" href="/className-12/chemistry/haloalkanes-and-haloarenes">HALOALKANES AND HALOARENES</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 11:</span><a className="link" href="/className-12/chemistry/alcohols-phenols-and-ethers">ALCOHOLS, PHENOLS AND ETHERS</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 12:</span><a className="link" href="/className-12/chemistry/aldehydes-ketones-and-carboxylic-acids">ALDEHYDES, KETONES AND CARBOXYLIC ACIDS</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 13:</span><a className="link" href="/className-12/chemistry/amines">AMINES</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 14:</span><a className="link" href="/className-12/chemistry/biomolecules">BIOMOLECULES</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 15:</span><a className="link" href="/className-12/chemistry/polymers">POLYMERS</a></div></li><li><div className="flex flex-row items-center gap-2"><span className="text-base font-normal w-24 shrink-0">Chapter 16:</span><a className="link" href="/className-12/chemistry/chemistry-in-everyday-life">CHEMISTRY IN EVERYDAY LIFE</a></div></li></ul>
                        </div>
                    </div>

                    <div className=" w-[25%]">

                        <div className="">
                            <h2 className="text-lg font-semibold text-gray-800">Other subjects for Class 12</h2>
                            <ul className="mt-4 text-blue-500 space-y-2">
                                <li>Ncert Solutions for Class 12 MATHS</li>
                                <li>Ncert Solutions for Class 12 PHYSICS</li>
                                <li>Ncert Solutions for Class 12 CHEMISTRY</li>
                                <li>Ncert Solutions for Class 12 HINDI</li>
                                <li>Ncert Solutions for Class 12 ENGLISH</li>
                            </ul>

                            <h2 className="text-lg font-semibold text-gray-800 mt-8">Other classes for BIOLOGY</h2>
                            <ul className="mt-4 text-blue-500 space-y-2">
                                <li>Ncert Solutions for Class 6 BIOLOGY</li>
                                <li>Ncert Solutions for Class 7 BIOLOGY</li>
                                <li>Ncert Solutions for Class 8 BIOLOGY</li>
                                <li>Ncert Solutions for Class 9 BIOLOGY</li>
                            </ul>
                        </div>
                    </div>


                </div>
                <div className="columns-3xs gap-8 space-y-8">
                    <section className="mb-6 break-inside-avoid-column text-left">
                        <h6 className="uppercase font-bold mb-3 ">Exams</h6>
                        <ul className="text-sm pl-0 list-none list-inside">
                            <li className="pl-0 py-0.5">IIT JEE</li>
                            <li className="pl-0 py-0.5">NEET</li>
                            <li className="pl-0 py-0.5">UP Board</li>
                            <li className="pl-0 py-0.5">Bihar Board</li>
                            <li className="pl-0 py-0.5">CBSE</li>
                        </ul>
                    </section>
                    <section className="mb-6 break-inside-avoid-column text-left">
                        <h6 className="uppercase font-bold mb-3 ">Free Textbook Solutions</h6>
                        <ul className="text-sm pl-0 list-none list-inside">
                            <li className="pl-0 py-0.5  font-light">KC Sinha Solutions for Maths</li>
                            <li className="pl-0 py-0.5  font-light">Cengage Solutions for Maths</li>
                            <li className="pl-0 py-0.5  font-light">DC Pandey Solutions for Physics</li>
                            <li className="pl-0 py-0.5  font-light">HC Verma Solutions for Physics</li>
                            <li className="pl-0 py-0.5  font-light">Sunil Batra Solutions for Physics</li>
                            <li className="pl-0 py-0.5  font-light">Pradeep Solutions for Physics</li>
                            <li className="pl-0 py-0.5  font-light">Errorless Solutions for Physics</li>
                            <li className="pl-0 py-0.5  font-light">Narendra Awasthi Solutions for Chemistry</li>
                            <li className="pl-0 py-0.5  font-light">MS Chouhan Solutions for Chemistry</li>
                            <li className="pl-0 py-0.5  font-light">Errorless Solutions for Biology</li>
                        </ul>
                    </section>
                    <section className="mb-6 break-inside-avoid-column text-left">
                        <h6 className="uppercase font-bold mb-3 ">Free Ncert Solutions English Medium</h6>
                        <ul className="text-sm pl-0 list-none list-inside">
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 12 English Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 11 English Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 10 English Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 9 English Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 8 English Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 7 English Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 6 English Medium</li>
                        </ul>
                    </section>
                    <section className="mb-6 break-inside-avoid-column text-left">
                        <h6 className="uppercase font-bold mb-3 ">Free Ncert Solutions Hindi Medium</h6>
                        <ul className="text-sm pl-0 list-none list-inside">
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 12 Hindi Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 11 Hindi Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 10 Hindi Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 9 Hindi Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 8 Hindi Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 7 Hindi Medium</li>
                            <li className="pl-0 py-0.5 font-light">NCERT Solutions for Class 6 Hindi Medium</li>
                        </ul>
                    </section>
                    <section className="mb-6 break-inside-avoid-column text-left">
                        <h6 className="uppercase font-bold mb-3 ">Boards</h6>
                        <ul className="text-sm pl-0 list-none list-inside">
                            <li className="pl-0 py-0.5 font-light">CBSE</li>
                            <li className="pl-0 py-0.5 font-light">UP Board</li>
                            <li className="pl-0 py-0.5 font-light">Bihar Board</li>
                            <li className="pl-0 py-0.5 font-light">UP Board</li>
                        </ul>
                    </section>
                    <section className="mb-6 break-inside-avoid-column text-left">
                        <h6 className="uppercase font-bold mb-3 ">Resources</h6>
                        <ul className="text-sm pl-0 list-none list-inside">
                            <li className="pl-0 py-0.5 font-light">Unit Converters</li>
                            <li className="pl-0 py-0.5 font-light">Calculators</li>
                            <li className="pl-0 py-0.5 font-light">Books Store</li>
                            <li className="pl-0 py-0.5 font-light">Seminar</li>
                            <li className="pl-0 py-0.5 font-light">Results</li>
                            <li className="pl-0 py-0.5 font-light">Search Doubtnut</li>
                            <li className="pl-0 py-0.5 font-light">Blogs</li>
                            <li className="pl-0 py-0.5 font-light">Class 12 All Books</li>
                            <li className="pl-0 py-0.5 font-light">Class 11 All Books</li>
                            <li className="pl-0 py-0.5 font-light">Class 10 All Books</li>
                            <li className="pl-0 py-0.5 font-light">Class 9 All Books</li>
                            <li className="pl-0 py-0.5 font-light">Class 8 All Books</li>
                            <li className="pl-0 py-0.5 font-light">Class 7 All Books</li>
                            <li className="pl-0 py-0.5 font-light">Class 6 All Books</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Page;
