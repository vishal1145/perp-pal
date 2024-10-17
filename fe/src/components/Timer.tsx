import { text2 } from '@/data/data';
import { getTotalSeconds } from '@/data/functions';
import React, { useEffect, useState } from 'react';
import CustomCardLoader from './CustomCardLoader';

type TimerProps = {
  qsnChange:number;
  setSubmitTime:(timeInSeconds:number, qsnChange:number,   totalSeconds:number, totalMinutes:number, totalHours:number )=>void;
  loading:boolean;
};

const Timer: React.FC<TimerProps> = ({ qsnChange, setSubmitTime, loading }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  useEffect(()=>{  
      const timeInSeconds = getTotalSeconds(seconds, minutes, hours)
      setSubmitTime(timeInSeconds, qsnChange,  seconds, minutes, hours);

      setHours(0);
      setMinutes(0);
      setSeconds(0); 
  }, [qsnChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds < 59) {
          return prevSeconds + 1;
        } else {
          if(minutes < 59){
            setMinutes(minutes+1);
          }else{
            setHours(hours+1);
            setMinutes(0);
          }
       
          return 0;  
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (

    <>
    {
         loading ?  <CustomCardLoader viewBox={`0 0 200 40`} className={'mt-2'} rectW='100%' rectH='40'/>
         :
         <div className="flex flex-wrap items-center justify-start w-full gap-2 md:gap-4">
     
         <div className="timer w-10">
           <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-black text-center">
             {String(hours).padStart(2, '0')}
           </h3>
           <div className={`${text2} text-center`}>hours</div>
         </div>
         <h3 className="font-semibold text-base md:text-lg lg:text-xl text-gray-900 mb-7">:</h3>
        
    
         <div className="timer w-10">
           <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-center">
             {String(minutes).padStart(2, '0')}
           </h3>
           <div className={`${text2} text-center`}>minutes</div>
         </div>
         <h3 className="colon font-semibold text-xl text-gray-900 mx-1 mb-7">:</h3>
       
  
       <div className="timer w-10">
         <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-center">
           {String(seconds).padStart(2, '0')}
         </h3>
         <div className={`${text2} text-center`}>seconds</div>
       </div>
     
   </div>
    }
    </>
  
  );
};

export default Timer;
