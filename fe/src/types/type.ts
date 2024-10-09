export type DropdownSearchProps = {
    filter:string;
    options: { id: string; name: string }[];
  };
  
export type McqQuestion = {
    questionId:string;
    question:string;
    options:{optionText:string, optionFlag:string}[]
    correctAnswer:string;
};
