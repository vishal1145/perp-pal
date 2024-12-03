export type DropdownSearchProps = {
  filter: string;
  options: FilterOption[];  
  filterOptionSelect: (id: string | null) => void;
};

export interface McqQuestion {
  _id:string;
  questionId: string;
  question: string;
  options: { optionText: string; optionFlag: string }[];
  answer:string;
  minTime:Number;
  maxTime:Number;
  avgTime:Number;
  showHints:String;
}

export interface UserPracticePaper{
  McqQuestion:McqQuestion;
  userSelectAns:string|number;
  userSelectAnsString:string;
  submitTimeInSeconds?:number;
}

export interface SubmitAssessment{
  questionId:McqQuestion
  userSelectAns:string;
  submitTimeInSeconds?:number;
  userSelectAnsString:string;
}

export interface McqTestQuestion {
  McqQuestion: McqQuestion;
  chooseAns: string;
}


export interface FilterOption {
  id: string;
  name: string;
}

