import { text2 } from '@/data/data';
import React, { useState } from 'react'

const Statics = () => {
    const [hours, setHours] = useState<number>(10);
    const [minutes, setMinutes] = useState<number>(10);
    const [seconds, setSeconds] = useState<number>(10); 
  return (
    <div className="flex flex-wrap items-center justify-start w-full gap-2 md:gap-4 mt-2">
   
        <div className="timer  ">
          <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-black text-center">
            {String(hours).padStart(2, '0')}
          </h3>
          <div className={`${text2} text-center`}>Min time</div>
        </div>
     
    

 
        <div className="timer  ">
          <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-center">
            {String(minutes).padStart(2, '0')}
          </h3>
          <div className={`${text2} text-center`}>Average time</div>
        </div>
        
       
 
      <div className="timer  ">
        <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-center">
          {String(seconds).padStart(2, '0')}
        </h3>
        <div className={`${text2} text-center`}>Max time</div>
      </div>
    
  </div>
  )
}

export default Statics