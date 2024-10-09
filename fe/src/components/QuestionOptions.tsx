import React from 'react';

type QuestionOptionsProps = {
  question: string;
  options: string[];
  onSelect: (selectedOptions: string[]) => void;
};

const QuestionOptions: React.FC<QuestionOptionsProps> = ({ question, options }) => {
  return (
    <div className="pb-4 w-full">
      <h2 className="text-sm font-medium mb-2">{question}</h2>
      <div className="grid grid-cols-1 gap-1">
        {options.map((option ) => (
            <span className="text-sm text-gray-500 break-words max-w-xs">{option}</span>
        ))}
      </div>
      <div className='py-2' style={{borderBottom: '1px solid #f2f2f2'}}></div>
    </div>
  );
};

export default QuestionOptions;