import { text2 } from '@/data/data';
type StaticProps = {
  minTime: number;  
  maxTime: number;
  avgTime: number;
};

const Statics: React.FC<StaticProps> = ({ minTime, maxTime, avgTime }) => {
    const convertSectoMint = (seconds:number)=>{
      const roundedSeconds = Math.round(seconds);
      const minutes = Math.floor(roundedSeconds / 60);
      const secs = roundedSeconds % 60;
      return `${minutes}:${secs.toString().padStart(2, '0')}`;  
    }

  return (
    <div className="flex mt-2 flex-wrap items-center justify-start w-full gap-2 md:gap-4">
      <div className="timer w-10">
        <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-black text-center">
          {/* {minTime === Number.MAX_VALUE ? 0 : Math.ceil(minTime)} */}
          {minTime === Number.MAX_VALUE ? '0:00' : convertSectoMint(minTime)}
        </h3>
        <div className={`${text2} text-center`}>Min</div>
      </div>
      <h3 className=" invisible">:</h3>

      <div className="timer w-10">
        <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-black text-center">
          {/* { Math.ceil(maxTime)} */}
          {convertSectoMint(maxTime)}
        </h3>
        <div className={`${text2} text-center`}>Max</div>
      </div>
      <h3 className=" invisible">:</h3>

      <div className="timer w-10">
        <h3 className="text-blue-700 font-semibold text-base md:text-lg lg:text-xl text-black text-center">
          {/* { Math.ceil(avgTime)} */}
          {convertSectoMint(avgTime)}
        </h3>
        <div className={`${text2} text-center`}>Avg</div>
      </div>
    </div>
  )
}

export default Statics