import { McqQuestion } from '@/types/type';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Latex = dynamic(() => import('react-latex-next'), { ssr: false });
const optionFlag = ['A', 'B', 'C', 'D']

const QuestionOptions: React.FC<McqQuestion & { index: number }> = ({  question, options,   index }) => {
  return (
    <div className="pb-4 w-full questions">
      <h2 className="text-sm font-medium mb-2 mr-4">{`Q${index}. `}
      <Latex>{question}</Latex>
      </h2>
      <div className="grid grid-cols-1 gap-1">
        {optionFlag.map((item, index) => (
          <div className='options'>
            <span className="mr-4 ">
              {`${item}.`}
            </span>
            <Latex>
             {Object.values(options)[index].value}
              </Latex> 
            </div>
        ))}
      </div>
      <div className='py-2' style={{borderBottom: '1px solid #f2f2f2'}}></div>
    </div>
  );
};

export default QuestionOptions;