import { McqQuestion } from '@/types/type';
import React from 'react';
import dynamic from 'next/dynamic';

const Latex = dynamic(() => import('react-latex-next'), { ssr: false });
const optionFlag = ['A', 'B', 'C', 'D']

const QuestionOptions: React.FC<McqQuestion & { index: number }> = ({ question, options, index }) => {
  return (
    <div className="pb-4 w-full questions">
      <h2 className="text-sm font-medium mb-2 mr-4">{`Q${index}. `}
        <Latex>{question}</Latex>
      </h2>
      <div className="grid grid-cols-1 gap-1">
        {optionFlag.map((item, index) => {

          const optionValue = Object.values(options)[index]?.value;
          const displayValue = typeof optionValue === 'string' ? optionValue : String(optionValue); // Fallback to string if not a string

          return (
            <div className='options' key={index}>
              <span className="mr-4">{`${item}.`}</span>
              <Latex>{displayValue}</Latex>
            </div>
          );
        })}
      </div>
      <div className='py-2' style={{ borderBottom: '1px solid #f2f2f2' }}></div>
    </div>
  );
};

export default QuestionOptions;