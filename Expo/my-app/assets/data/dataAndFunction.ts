export let prompt_text:string = '';
export const setPrompt_Text = (text:string):void=>{
    prompt_text = text;
}


export let startAssesmentId = '';
export const setAssesmentId = (id:string):void =>{
    startAssesmentId = id;
    console.log(id);
}