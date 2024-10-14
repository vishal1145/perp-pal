import React, { useEffect, useState } from 'react';

type TimerProps = {
  initialHours: number;
  initialMinutes: number;
  initialSeconds: number;
};

const Timer: React.FC<TimerProps> = ({ initialHours, initialMinutes, initialSeconds }) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(57);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds < 59) {
          return prevSeconds + 1;
        } else {
          setMinutes(prevMinutes => {
            if (prevMinutes < 59) {
              return prevMinutes + 1;
            } else {
              setHours(prevHours => prevHours + 1);
              return 0;  
            }
          });
          return 0;  
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-start justify-start w-full gap-4 count-down-main mt-2">
      {hours >= 0 && (
        <>
          <div className="timer w-8">
            <h3 className="countdown-element hours text-blue-700 font-semibold text-2xl text-black">
              {String(hours).padStart(2, '0')}
            </h3>
            <p className="text-sm font-normal text-gray-900 mt-1 text-center">hours</p>
          </div>
          <h3 className="font-semibold text-2xl text-gray-900">:</h3>
        </>
      )}

      {minutes >= 0 && (
        <>
          <div className="timer w-10">
            <h3 className="countdown-element minutes text-blue-700 font-semibold text-2xl text-center">
              {String(minutes).padStart(2, '0')}
            </h3>
            <p className="text-sm font-normal text-gray-900 mt-1">minutes</p>
          </div>
          <h3 className="text-blue-700 font-semibold text-2xl text-gray-900">:</h3>
        </>
      )}

      {seconds >= 0 && (
        <div className="timer w-10">
          <h3 className="countdown-element seconds text-blue-700 font-semibold text-2xl text-center">
            {String(seconds).padStart(2, '0')}
          </h3>
          <p className="text-sm font-normal text-gray-900 mt-1 text-center">seconds</p>
        </div>
      )}
    </div>
  );
};

export default Timer;
