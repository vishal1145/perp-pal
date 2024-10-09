"use client";
import React, { useEffect, useState } from 'react'
import DropdownSearch from '@/components/Multiselect'
import { Bloom, CreatePaper, Difficulty, ExamSetup, Length, Marks, Nature, TextBook } from '@/data/multiSelectData'
import { DemoBanner } from '@/components/DemoBanner'
import Faq from '@/components/FAQ/Faq'
import axios from 'axios'
import QuestionOptions from '@/components/QuestionOptions'
import { McqQuestion } from '@/types/type'
import CustomCardLoader from '@/components/CustomCardLoader'
import { useRouter } from 'next/navigation';  

const Assessment = () => {
   const [loading, setLoading] = useState(true);
   const [questions, setQuestions] = useState([]);

   const router = useRouter();   

   const handlePracticeClick = () => {
     router.push('/practice-screen');   
   };

   const getMcq = async () => {
     try {
       const response = await axios.get(`https://prep-pal.algofolks.com/api/Question`)
       setQuestions(response.data.slice(0, 20));
       setLoading(false);
     } catch (error) {
       console.log(error);
     }
   }

   useEffect(() => {
     getMcq();
   }, []);  

   return (
     <>
       <DemoBanner notMainPage={true} />
       <div id='maidiv' className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-0 sm:py-4">
         <aside
           id="sidebar-multi-level-sidebar"
           className="col-span-12 sm:col-span-3 py-4 rounded-sm bg-gray-50 dark:bg-gray-800 h-full"
           aria-label="Sidebar"
         >
           <div className="h-full px-3 rounded-md overflow-y-auto">
             <ul className="space-y-2 font-medium px-2">
               <li className='text-sm font-medium pl-2'> Assessment Filter </li>
               <li><DropdownSearch filter={CreatePaper.filter} options={CreatePaper.options} /></li>
               <li><DropdownSearch filter={ExamSetup.filter} options={ExamSetup.options} /></li>
               <li><DropdownSearch filter={TextBook.filter} options={TextBook.options} /></li>
               <li><DropdownSearch filter={Marks.filter} options={Marks.options} /></li>
               <li><DropdownSearch filter={Nature.filter} options={Nature.options} /></li>
               <li><DropdownSearch filter={Length.filter} options={Length.options} /></li>
               <li><DropdownSearch filter={Bloom.filter} options={Bloom.options} /></li>
               <li><DropdownSearch filter={Difficulty.filter} options={Difficulty.options} /></li>
             </ul>
           </div>
         </aside>

         <div id='div2' className="px-4 sm:px-1 col-span-12 sm:col-span-9 md:col-span-9 lg:col-span-6 bg-white">
           <div>Title</div>
           <div className='text-gray-500'>Subtitle</div>
           <div className="mb-4 dark:bg-gray-800 mt-3">
             {loading && questions.length === 0 ? (
               Array(20).fill(0).map((_, i) => (
                 <CustomCardLoader key={i} />
               ))
             ) : (
               questions.map((item: McqQuestion, index: number) => (
                 <QuestionOptions
                   questionId={item.questionId}
                   question={item.question}
                   options={item.options}
                   correctAnswer={item.correctAnswer}
                   key={item.questionId}
                   index={index + 1}
                 />
               ))
             )}
           </div>
           <button
             type="button"
             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full"
             onClick={handlePracticeClick}
           >
             Practice
           </button>
         </div>

         <div id='div3' className="col-span-12 sm:col-span-3">
           <Faq />
         </div>
       </div>
     </>
   )
}

export default Assessment;
