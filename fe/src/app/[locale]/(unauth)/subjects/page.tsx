'use client';
import React from 'react';
import { Banner } from '@/components/Banner';
import PreppalFooter from '@/components/PreppalFooter';
import Footer from '@/components/Footer';
const Page = () => {


    return (
        <>
            <Banner notMainPage={true} />
            <div className="min-h-screen ">
                <div className='px-4 sm:px-8 mb-8'>

                    <div className="w-full  pt-8">

                        <div className="flex flex-col md:flex-row gap-16  w-[100%]">
                            <div className='w-[70%]'>
                                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900">
                                    Ncert Solutions for Class 12 BIOLOGY
                                </h1>
                                <p className="mt-4 font-light text-gray-500 text-lg">
                                    NCERT Solutions for Class 12 BIOLOGY aims to help a student develop a comprehensive conceptual understanding of all the topics included in the CBSE Class 12 BIOLOGY Syllabus. The CBSE Class 12 BIOLOGY NCERT Solutions is important for Class 12th board exams preparation. NCERT Solutions for Class 12 BIOLOGY will help you score excellent marks in CBSE Class 12 board exams and help you qualify the engineering entrance exams such as <span className="font-semibold">JEE Main, JEE Advanced, BITSAT, VITEEE, SRMJEEE</span> etc.
                                </p>
                                <div className="mt-6">
                                    <table className="w-full border border-gray-300 text-left font-light text-gray-500">
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
                                    <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Ncert Syllabus for Class 12 BIOLOGY</h2>
                                    <ul className="list-none py-5 font-light text-gray-500">
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 1:</span>
                                                <a className="link" href="/className-12/chemistry/solid-state">THE SOLID STATE</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 2:</span>
                                                <a className="link" href="/className-12/chemistry/solutions">SOLUTION</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 3:</span>
                                                <a className="link" href="/className-12/chemistry/electrochemistry">ELECTROCHEMISTRY</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 4:</span>
                                                <a className="link" href="/className-12/chemistry/chemical-kinetics">CHEMICAL KINETICS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 5:</span>
                                                <a className="link" href="/className-12/chemistry/surface-chemistry">SURFACE CHEMISTRY</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 6:</span>
                                                <a className="link" href="/className-12/chemistry/general-principles-and-processes-of-isolation-of-elements">GENERAL PRINCIPLES AND PROCESSESS OF ISOLATION OF ELEMENTS </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 7:</span>
                                                <a className="link" href="/className-12/chemistry/p-block-elements">THE P-BLOCK ELEMENTS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 8:</span>
                                                <a className="link" href="/className-12/chemistry/d-and-f-block-elements">THE D AND F BLOCK ELEMENTS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 9:</span>
                                                <a className="link" href="/className-12/chemistry/coordination-compounds">COORDINATION COMPOUNDS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 10:</span>
                                                <a className="link" href="/className-12/chemistry/haloalkanes-and-haloarenes">HALOALKANES AND HALOARENES</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 11:</span>
                                                <a className="link" href="/className-12/chemistry/alcohols-phenols-and-ethers">ALCOHOLS, PHENOLS AND ETHERS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 12:</span>
                                                <a className="link" href="/className-12/chemistry/aldehydes-ketones-and-carboxylic-acids">ALDEHYDES, KETONES AND CARBOXYLIC ACIDS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2mb-2">
                                                <span className=" w-24 shrink-0">Chapter 13:</span>
                                                <a className="link" href="/className-12/chemistry/amines">AMINES</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 14:</span>
                                                <a className="link" href="/className-12/chemistry/biomolecules">BIOMOLECULES</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className=" w-24 shrink-0">Chapter 15:</span>
                                                <a className="link" href="/className-12/chemistry/polymers">POLYMERS</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex flex-row items-center gap-2 mb-2">
                                                <span className="w-24 shrink-0">Chapter 16:</span>
                                                <a className="link" href="/className-12/chemistry/chemistry-in-everyday-life">CHEMISTRY IN EVERYDAY LIFE</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <div className="mt-0">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Other subjects for Class 12</h2>
                                    <ul className="mt-4 font-light text-gray-500 space-y-2 ">
                                        <li>Ncert Solutions for Class 12 MATHS</li>
                                        <li>Ncert Solutions for Class 12 PHYSICS</li>
                                        <li>Ncert Solutions for Class 12 CHEMISTRY</li>
                                        <li>Ncert Solutions for Class 12 HINDI</li>
                                        <li>Ncert Solutions for Class 12 ENGLISH</li>
                                    </ul>
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">Other classes for BIOLOGY</h2>
                                    <ul className="mt-4 font-light text-gray-500 space-y-2 ">
                                        <li>Ncert Solutions for Class 6 BIOLOGY</li>
                                        <li>Ncert Solutions for Class 7 BIOLOGY</li>
                                        <li>Ncert Solutions for Class 8 BIOLOGY</li>
                                        <li>Ncert Solutions for Class 9 BIOLOGY</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <PreppalFooter />
                <Footer />

            </div>

        </>
    );
};

export default Page;
