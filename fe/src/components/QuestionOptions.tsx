import { McqQuestion } from '@/types/type';
import React from 'react';



const QuestionOptions: React.FC<McqQuestion & { index: number }> = ({  question, options,   index }) => {
  return (
    <div className="pb-4 w-full">
      <h2 className="text-sm font-medium mb-2">{`Q${index}. ${question}`}</h2>
      <div className="grid grid-cols-1 gap-1">
        {options.map(( item) => (
            <span className="text-sm text-gray-500 break-words max-w-xs">{`${item.optionFlag}. ${item.optionText}`}</span>
        ))}
      </div>
      <div className='py-2' style={{borderBottom: '1px solid #f2f2f2'}}></div>
    </div>
  );
};

export default QuestionOptions;