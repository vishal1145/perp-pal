export let prompt_text:string = '';
export const setPrompt_Text = (text:string):void=>{
    prompt_text = text;
}


export let startAssesmentId = '';
export const setAssesmentId = (id:string):void =>{
    startAssesmentId = id;
    console.log(id);
}

export const getTotalSeconds = (seconds:number, minutes:number, hours:number):number=>{
    const total = hours * 3600 + minutes * 60 + seconds;
    return total;
}
