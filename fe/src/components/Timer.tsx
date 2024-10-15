import React, { useEffect, useState } from 'react';

type TimerProps = {
  index:number;
  setSubmitTime:(time:Date, index:number,  totalSeconds:number, totalMinutes:number, totalHours:number )=>void;
 
};

const Timer: React.FC<TimerProps> = ({ index, setSubmitTime }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  useEffect(()=>{
      const time = new Date();
      time.setHours(hours)
      time.setMinutes(minutes);
      time.setSeconds(seconds);
      setSubmitTime(time, index, seconds, minutes, hours);
      setHours(0);
      setMinutes(0);
      setSeconds(0); 
  }, [index]);

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
    <div className="flex flex-wrap items-center justify-start w-full gap-2 md:gap-4 mt-2">
      {hours >= 0 && (
        <>
          <div className="timer w-8 md:w-10">
            <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-black text-center">
              {String(hours).padStart(2, '0')}
            </h3>
            <p className="text-xs md:text-sm lg:text-base font-normal text-gray-900 mt-1 text-center">hours</p>
          </div>
          <h3 className="font-semibold text-base md:text-lg lg:text-xl text-gray-900 mb-7">:</h3>
        </>
      )}

      {minutes >= 0 && (
        <>
          <div className="timer w-8 md:w-10">
            <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-center">
              {String(minutes).padStart(2, '0')}
            </h3>
            <p className="text-xs md:text-sm lg:text-base font-normal text-gray-900 mt-1 text-center">minutes</p>
          </div>
          <h3 className="colon font-semibold text-xl text-gray-900 mx-1 mb-7">:</h3>
        </>
      )}

      {seconds >= 0 && (
        <div className="timer w-8 md:w-10">
          <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-center">
            {String(seconds).padStart(2, '0')}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-gray-900 mt-1 text-center">seconds</p>
        </div>
      )}
    </div>
  );
};

export default Timer;
