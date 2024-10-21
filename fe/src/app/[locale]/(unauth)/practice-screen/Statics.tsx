import { text2 } from '@/data/data';
import React, { useState } from 'react'

const Statics = () => {
    const [hours, setHours] = useState<number>(10);
    const [minutes, setMinutes] = useState<number>(10);
    const [seconds, setSeconds] = useState<number>(10); 
  return (
    <div className="flex mt-2 flex-wrap items-center justify-start w-full gap-2 md:gap-4">
         <div className="timer w-10">
           <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-black text-center">
             {String(10).padStart(2, '0')}
           </h3>
           <div className={`${text2} text-center`}>Min</div>
         </div>
         <h3 className=" invisible">:</h3>
        
         <div className="timer w-10">
           <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-black text-center">
             {String(10).padStart(2, '0')}
           </h3>
           <div className={`${text2} text-center`}>Max</div>
         </div>
         <h3 className=" invisible">:</h3>

         <div className="timer w-10">
           <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-black text-center">
             {String(10).padStart(2, '0')}
           </h3>
           <div className={`${text2} text-center`}>Avg</div>
         </div>
   </div>
  )
}

export default Statics