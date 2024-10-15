"use client";

import React, { useEffect, useState } from 'react';
import DropdownSearch from '@/components/Multiselect';
import { DemoBanner } from '@/components/DemoBanner';
import Faq from '@/components/FAQ/Faq';
import axios from 'axios';
import QuestionOptions from '@/components/QuestionOptions';
import { McqQuestion, FilterOption } from '@/types/type';
import CustomCardLoader from '@/components/CustomCardLoader';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import { FilterLoader } from '@/data/data';
 
const useFetchData = (url: string, setData: React.Dispatch<React.SetStateAction<any>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, dataType?: string | null) => {
  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        if(dataType==="Questions"){
          setData(data);
        }else{
          setData(data.map((item:any)=>({id:item.id, name:item.className})));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, setData, setLoading]);
};

const Assessment: React.FC = () => {
  const [questionloading, setQuestionLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const[showLoader, setShowLoader] = useState<boolean>(false);
  const [questions, setQuestions] = useState<McqQuestion[]>([]);
  const [classFilter, setClassFilter] = useState<FilterOption[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<FilterOption[]>([]);
  const [chapterFilter, setChapterFilter] = useState<FilterOption[]>([]);
  const [levelFilter, setLevelFilter] = useState<FilterOption[]>([]);
  const [formattedText, setFormattedText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    classId: null as string | null,
    subjectId: null as string | null,
    chapterId: null as string | null,
    levelId:null as string | null
  });
 



  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFormattedText(window.location?.pathname.split('/').pop());
    }
  }, []);

  const router = useRouter();
  const handlePracticeClick = async () => {
    try {
      setShowLoader(true);
       const { data } = await axios.post(`https://prep-pal.algofolks.com/api/Question/generate-guid`);
       await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/questions`, questions);
       router.push(`/practice-screen?data=${encodeURIComponent(data.id)}`);

    } catch (error) {
      console.error('Error generating practice:', error);
    }
  };

  useFetchData(`https://prep-pal.algofolks.com/api/Education/class`, setClassFilter, setLoading);
  useFetchData(`https://prep-pal.algofolks.com/api/Question`, setQuestions, setQuestionLoading, "Questions");

  const fetchFilterOptions = async (type: string, id: string) => {
    try {
      const endpoint = type === 'subject' 
        ? `https://prep-pal.algofolks.com/api/Education/subject/class/67069f86fc430151577d39fd`
        : type === 'chapter'
        ? `https://prep-pal.algofolks.com/api/Education/chapter/subject/670786588730a1e5d31aa614`
        : `https://prep-pal.algofolks.com/api/Education/level`;

      const { data } = await axios.get(endpoint);

      return data.map((item: any) => ({
        id: item.subjectId || item.chapterId || item.id,
        name: item.subjectName || item.chapterName || item.levelName,
      }));


    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return [];
    }
  };

  // useEffect(() => {
  //   const { classId, subjectId, chapterId } = selectedFilters;

  //   if (classId) {
  //     fetchFilterOptions('subject', classId).then(setSubjectFilter);
  //   } else {
  //     setSubjectFilter([]);
  //   }

  //   if (subjectId) {
  //     fetchFilterOptions('chapter', subjectId).then(setChapterFilter);
  //   } else {
  //     setChapterFilter([]);
  //   }

  //   if (chapterId) {
  //     fetchFilterOptions('level', chapterId).then(setLevelFilter);
  //   } else {
  //     setLevelFilter([]);
  //   }
  // }, [selectedFilters]);

  useEffect(()=>{
    fetchFilterOptions('subject', '67069f86fc430151577d39fd').then(setSubjectFilter);
    fetchFilterOptions('chapter', '670788242e0e06e67865a429').then(setChapterFilter);
    fetchFilterOptions('level', 'chapterId').then(setLevelFilter);

      // fetchFilterOptions('subject', '67069f86fc430151577d39fd').then(setSubjectFilter);
      // fetchFilterOptions('chapter', '670786588730a1e5d31aa614').then(setSubjectFilter);
      // fetchFilterOptions('subject', '67069f86fc430151577d39fd').then(setSubjectFilter);

  },[])
  const handleFilterChange = (filter: 'classId' | 'subjectId' | 'chapterId' | 'levelId', value: string | null) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: value }));
  };

  return (
    <>
      <DemoBanner notMainPage={true} />
           <div id='maidiv' className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-0 sm:py-4 sm:pl-4">
        
           <aside className="col-span-12 sm:col-span-3 py-4 rounded-sm bg-gray-50 dark:bg-gray-800 h-full" aria-label="Sidebar">
             <div className="h-full px-3 rounded-md overflow-y-auto">
               <ul className="space-y-2 font-medium px-2">
                 <li className='text-md font-medium pl-2'>Assessment Filter</li>

                 {
                  classFilter.length > 0 ? (
                    <li>
                    <DropdownSearch filter="Class" options={classFilter} filterOptionSelect={(value) => handleFilterChange('classId', value)} />
                  </li>
                  ):
                  <CustomCardLoader viewBox={FilterLoader.viewBox} className={FilterLoader.className} rectW={FilterLoader.rectW} rectH={FilterLoader.rectH}/>
                 }
               
                 {/* {selectedFilters.classId && (
                   <li>
                     <DropdownSearch filter="Subject" options={subjectFilter} filterOptionSelect={(value) => handleFilterChange('subjectId', value)} />
                   </li>
                 )}
                 {selectedFilters.subjectId && selectedFilters.classId && (
                   <li>
                     <DropdownSearch filter="Chapter" options={chapterFilter} filterOptionSelect={(value) => handleFilterChange('chapterId', value)} />
                   </li>
                 )}
                 {selectedFilters.chapterId && selectedFilters.subjectId && selectedFilters.classId && (
                   <li>
                     <DropdownSearch filter="Level" options={levelFilter} filterOptionSelect={(value) => handleFilterChange('levelId', value)} />
                   </li>
                 )} */}
   
   
   
   {subjectFilter.length > 0 ? (
                   <li>
                     <DropdownSearch filter="Subject" options={subjectFilter} filterOptionSelect={(value) => handleFilterChange('subjectId', value)} />
                   </li>
                 ):
                 <CustomCardLoader viewBox={FilterLoader.viewBox} className={FilterLoader.className} rectW={FilterLoader.rectW} rectH={FilterLoader.rectH}/>
                 }
                 {chapterFilter.length > 0 ? (
                   <li>
                     <DropdownSearch filter="Chapter" options={chapterFilter} filterOptionSelect={(value) => handleFilterChange('chapterId', value)} />
                   </li>
                 )   :
                 <CustomCardLoader viewBox={FilterLoader.viewBox} className={FilterLoader.className} rectW={FilterLoader.rectW} rectH={FilterLoader.rectH}/>}
                 { levelFilter.length > 0 ? (
                   <li>
                     <DropdownSearch filter="Level" options={levelFilter} filterOptionSelect={(value) => handleFilterChange('levelId', value)} />
                   </li>
                         ):
                         <CustomCardLoader viewBox={FilterLoader.viewBox} className={FilterLoader.className} rectW={FilterLoader.rectW} rectH={FilterLoader.rectH}/>
                        }
               </ul>
             </div>
           </aside>
   
           <div className="px-4 sm:px-1 col-span-12 sm:col-span-9 md:col-span-9 lg:col-span-6 bg-white">
           <div className='flex justify-between'>
             
             <div>
   
              <div className='text-md font-medium'>Your Questions</div>
             <div className='text-gray-500 font-sm text-md'>{formattedText}</div>
             </div>
   
   
   {
       showLoader == true ? 

       (<Loader  />) :

       (
        <button
        type="button"
        className="border border-gray-500  bg-transparent cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none hover:bg-gray-200"
        onClick={handlePracticeClick}
        style={{
          border:"1px solid rgb(226, 226, 226)",
          color:"rgb(107 114 128)"
        }}
      >
        Start Practice      
      </button>
       )
}
           
   
   
    
   
   
   </div>
   
   <div className='py-2 mt-2' style={{ borderBottom: '1px solid #e2e2e2' }}></div>
   
             <div className="mb-4 dark:bg-gray-800 mt-3">
               {questionloading ? (
                

                 Array.from({ length: 20 }, (_, i) => <CustomCardLoader key={i} viewBox={`0 0 380 80`} className={'mt-2'} rectW='100%' rectH='70'/>)
               ) : (
                 questions.map((item, index) => (
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

             {
              showLoader === true ?

   <Loader className={'flex justify-center'} />
              : 

              <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full"
              disabled={showLoader}
              onClick={handlePracticeClick}
            >
             Start Practice
            </button>
             }
         
           </div>
   
           <div className="col-span-12 sm:col-span-3">
             <Faq />
           </div>
         </div>
    </>
  );
};

export default Assessment;