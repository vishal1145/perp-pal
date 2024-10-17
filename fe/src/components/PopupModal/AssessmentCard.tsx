import { text2 } from '@/data/data';
import React, { FC } from 'react'
type AssessmentCardProps = {
  title: string;
  value: string;
}
const AssessmentCard: FC<AssessmentCardProps> = ({ title, value }) => {
  return (
    <div
      className="relative w-30 group bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    >
      <h3 className="text-black font-bold text-lg  text-center">
        {value}
      </h3>
      <p className={`${text2} text-center`}> {title}</p>

    </div>

  )
}

export default AssessmentCard