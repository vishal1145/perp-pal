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
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<McqQuestion[]>([]);
  const [classFilter, setClassFilter] = useState<FilterOption[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<FilterOption[]>([]);
  const [chapterFilter, setChapterFilter] = useState<FilterOption[]>([]);
  const [levelFilter, setLevelFilter] = useState<FilterOption[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    classId: null as string | null,
    subjectId: null as string | null,
    chapterId: null as string | null,
    levelId:null as string | null
  });

  const router = useRouter();

  useEffect(()=>{
     console.log(classFilter);
     debugger
  }, [classFilter])
  const handlePracticeClick = async () => {
    try {
      const { data } = await axios.post(`https://prep-pal.algofolks.com/api/Question/generate-guid`);
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
        ? `https://prep-pal.algofolks.com/api/Education/subject/class/${id}`
        : type === 'chapter'
        ? `https://prep-pal.algofolks.com/api/Education/chapter/subject/${id}`
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

  useEffect(() => {
    const { classId, subjectId, chapterId } = selectedFilters;

    if (classId) {
      fetchFilterOptions('subject', classId).then(setSubjectFilter);
    } else {
      setSubjectFilter([]);
    }

    if (subjectId) {
      fetchFilterOptions('chapter', subjectId).then(setChapterFilter);
    } else {
      setChapterFilter([]);
    }

    if (chapterId) {
      fetchFilterOptions('level', chapterId).then(setLevelFilter);
    } else {
      setLevelFilter([]);
    }
  }, [selectedFilters]);

  const handleFilterChange = (filter: 'classId' | 'subjectId' | 'chapterId' | 'levelId', value: string | null) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: value }));
  };

  return (
    <>
      <DemoBanner notMainPage={true} />
      <div id='maidiv' className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-0 sm:py-4">
        <aside className="col-span-12 sm:col-span-3 py-4 rounded-sm bg-gray-50 dark:bg-gray-800 h-full" aria-label="Sidebar">
          <div className="h-full px-3 rounded-md overflow-y-auto">
            <ul className="space-y-2 font-medium px-2">
              <li className='text-md font-medium pl-2'>Assessment Filter</li>
              <li>
                <DropdownSearch filter="Class" options={classFilter} filterOptionSelect={(value) => handleFilterChange('classId', value)} />
              </li>
              {selectedFilters.classId && (
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
              )}
            </ul>
          </div>
        </aside>

        <div className="px-4 sm:px-1 col-span-12 sm:col-span-9 md:col-span-9 lg:col-span-6 bg-white">
          <div className='text-md font-medium'>Title</div>
          <div className='text-gray-500 font-sm text-md'>Subtitle</div>
          <div className="mb-4 dark:bg-gray-800 mt-3">
            {questionloading ? (
              Array.from({ length: 20 }, (_, i) => <CustomCardLoader key={i} />)
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
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full"
            onClick={handlePracticeClick}
          >
            Practice
          </button>
        </div>

        <div className="col-span-12 sm:col-span-3">
          <Faq />
        </div>
      </div>
    </>
  );
};

export default Assessment;

