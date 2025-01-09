export type DropdownSearchProps = {
  filter: string;
  options: FilterOption[];
  filterOptionSelect: (id: string | null) => void;
};
export interface Option {
  optionText: string;
  optionFlag: string;
  value: string | null;
}

export interface McqQuestion {
  _id: string;
  questionId: string;
  question: string;
  questionType: string;
  options: Option[];
  answer: string;
  minTime: Number;
  maxTime: Number;
  avgTime: Number;
  showHints: String;
}

export interface UserPracticePaper {
  McqQuestion: McqQuestion;
  userSelectAns: string | number;
  userSelectAnsString: string;
  submitTimeInSeconds?: number;
}

export interface SubmitAssessment {
  questionId: McqQuestion
  userSelectAns: string;
  submitTimeInSeconds?: number;
  userSelectAnsString: string;
}

export interface McqTestQuestion {
  McqQuestion: McqQuestion;
  chooseAns: string;
}


export interface FilterOption {
  id: string;
  name: string;
}

