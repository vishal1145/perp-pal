import { text1, text2 } from '@/data/data';
import React, { FC } from 'react'
type AssessmentCardProps = {
  title:string;
  value:string;
}
const AssessmentCard:FC<AssessmentCardProps> = ({title, value}) => {
  return (
    <div 
    className={`block  w-full  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100`}
  >
     <p className={`${text2} text-center mb-1`}>
   {value}
    </p>

    <h5 className={`${text1} text-center`}>
     {title}
    </h5>
   

  </div>
  )
}

export default AssessmentCard