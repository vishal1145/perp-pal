import React from 'react';

type QuestionOptionsProps = {
  question: string;
  options: string[];
  onSelect: (selectedOptions: string[]) => void;
};

const QuestionOptions: React.FC<QuestionOptionsProps> = ({ question, options }) => {

  

  return (
    // relative group bg-gray-100 p-6 rounded-lg shadow-md

    <div className="rounded-md bg-gray-100 shadow-md p-6 w-full  ">
      <h2 className="text-lg text-gray-500 mb-4">{question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
          
            <span className="text-gray-500 max-w-10">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionOptions;
