import React, { useEffect, useState } from 'react';

type TimerProps = {
  initialHours: number;
  initialMinutes: number;
  initialSeconds: number;
};

const Timer: React.FC<TimerProps> = ({ initialHours, initialMinutes, initialSeconds }) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds < 59) {
          return prevSeconds + 1;
        } else {
          if (minutes < 59) {
            setMinutes(minutes + 1);
          } else {
            setHours(hours + 1);
            setMinutes(0);
          }
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, hours]);

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
