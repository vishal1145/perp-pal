export const makeDate = (seconds:number, minutes:number, hours:number):Date=>{
      const date = new Date(1970, 0, 1, hours, minutes, seconds);
      return date;
}


export const getTotalSeconds = (seconds:number, minutes:number, hours:number):number=>{
     const total = hours * 3600 + minutes * 60 + seconds;
     return total;
}