"use client";
import React from 'react';
import QuestionOptions from './QuestionOptions';

const Question: React.FC = () => {
    const handleOptionSelect = (selectedOptions: string[]) => {
        console.log("Selected options:", selectedOptions);
      };
    
      return (
          <QuestionOptions 
            question="Q1. What are your favorite colors?" 
            options={[" A.  Red", " B.  Blue", " C.  Pink", " D.  Green"]} 
            onSelect={handleOptionSelect} 
          />
  
      );
};

export default Question;
