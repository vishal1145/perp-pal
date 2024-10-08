import React from 'react';

type QuestionOptionsProps = {
  question: string;
  options: string[];
  onSelect: (selectedOptions: string[]) => void;
};

const QuestionOptions: React.FC<QuestionOptionsProps> = ({ question, options }) => {
  return (
    <div className="rounded-md bg-gray-100 shadow-md p-4 w-full">
      <h2 className="text-sm font-medium mb-2">{question}</h2>
      <div className="grid grid-cols-1 gap-1">
        {options.map((option, index) => (
            <span className="text-sm text-gray-500 break-words max-w-xs">{option}</span>
        ))}
      </div>
    </div>
  );
};

export default QuestionOptions;