import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Nav from '../components/Nav';
import { getTotalSeconds, prompt_text, startAssesmentId } from '@/assets/data/dataAndFunction';
import axios from 'axios';
import Statics from '../components/Statics';
import Timer from '../components/Timer';
import ShowHint from '../components/ShowHint';
import PaperDetailModel from '../components/PaperDetailModel';
import Loader from '../components/Loader';

const QuizScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [questionLoading, setQuestionLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [qsnChange, setQsnChange] = useState(-1);
  const [userPracticePaper, setUserPracticePaper] = useState<any[]>([]);
  const [alreadySaveCall, setAlreadySaveCall] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [showHint, setShowHints] = useState(true);
  const[loader, setLoader] = useState();
  const getTotalSubmitTime = (): number => {
    const totalSec = totalSeconds % 60;
    const extraMin = Math.floor(totalSec / 60);

    let totalMin = totalMinutes % 60;
    const extraHours = Math.floor(totalMinutes / 60);

    const totalHr = totalHours + extraHours;
    totalMin += extraMin;

    return getTotalSeconds(totalSec, totalMin, totalHr);
  };

  const handleCheckboxChange = (value: string, idx: number) => {
    const newPracticePaper = [...userPracticePaper];
    const currentQuestion = newPracticePaper[index];

    if (currentQuestion) {
      if (currentQuestion?.userSelectAns === idx) {
        currentQuestion.userSelectAns = '';
        currentQuestion.userSelectAnsString = '';
      } else {
        currentQuestion.userSelectAns = idx;
        currentQuestion.userSelectAnsString = value;
      }
    }

    setUserPracticePaper(newPracticePaper);
  };

  const prevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
    setQsnChange(qsnChange-1);
    }
  };

  const nextQuestion = () => {
    if(index < userPracticePaper.length-2){
      setIndex(index + 1);
    }
      setQsnChange(qsnChange+1);
  };

  const submitPaper = async () => {
    if (alreadySaveCall) return;
    setAlreadySaveCall(true);
    setSubmitLoading(true);
    try {
      const totalSubmitTime = getTotalSubmitTime();

      const { data } = await axios.post(`https://preppal.club/api/assessments`, {
        userId: null,
        questions: userPracticePaper,
        totalSubmitTime: totalSubmitTime,
        paperTitle: prompt_text,
      });

      showViewDetailModal(data._id)
      setSubmitLoading(false);
    } catch (error) {
      console.error('Error submitting paper:', error);
      setAlreadySaveCall(false);
    }
  };

  const setSubmitTime = (
    timeInSeconds: number,
    qsnChange: number,
    totalTimeInSeconds: number,
    totalTimeInMinutes: number,
    totalTimeInHours: number
  ) => {
    if (qsnChange === -1) return;

    const newPracticePaper = [...userPracticePaper];
    const currentQuestion = newPracticePaper[qsnChange];
    if (currentQuestion) {
      if (!currentQuestion?.submitTimeInSeconds) {
        currentQuestion.submitTimeInSeconds = timeInSeconds;
      }
    }

    setUserPracticePaper(newPracticePaper);
    setTotalSeconds(totalSeconds + totalTimeInSeconds);
    setTotalMinutes(totalMinutes + totalTimeInMinutes);
    setTotalHours(totalHours + totalTimeInHours);
    if (qsnChange === userPracticePaper.length - 1) {
      submitPaper();
    }
  };

  const getPracticePaper = async (startAssesmentId: string) => {
    setQuestionLoading(true);
    try {
      const response = await axios.get(`https://preppal.club/api//startassesment/${startAssesmentId}`);
      const data = await response.data;

      setQuestions(data.questions.slice(1));
      setQuestionLoading(false);

      const initialPracticePaper = data.questions.map((q: any) => ({
        McqQuestion: q,
        userSelectAns: '',
        submitTimeInSeconds: null,
      }));

      setUserPracticePaper(initialPracticePaper);
    } catch (error) {
      console.error('Error fetching practice paper:', error);
      setQuestionLoading(false);
    }
  };

  useEffect(() => {
    getPracticePaper(startAssesmentId);
  }, []);

  const[viewDetail, setViewDetail] = useState(false);

  const[submitPopupValue, setsubmitPopupValue] = useState({
    title:"Assessment Score",
    subTitle:"subTitle",
    message:"",
    total:0,
    atemmpt:0,
    correct:0,
    incorrect:0,
    loaderShow:false,
    submitAssessmentId:''
  })

  const showViewDetailModal=(id:string):void=>{
    const total = userPracticePaper.length;
    let totalAttempt = 0;
    let correct = 0;
    
    for(let i=0;i<userPracticePaper.length; i++){
      if(userPracticePaper[i]?.userSelectAns != ""){
        totalAttempt++;
        if(userPracticePaper[i]?.McqQuestion?.correctAnswer == userPracticePaper[i]?.userSelectAns){
          correct++;
        }
      }
    }

    const incorrect = totalAttempt-correct;

    setsubmitPopupValue(prev=>({
      ...prev,
      total:total,
      atemmpt:totalAttempt,
      correct:correct,
      incorrect:totalAttempt-correct,
      submitAssessmentId:id
    }))
     
    setViewDetail(true);
  }

  return (
    <View style={styles.container}>
      <Nav />
    
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
     
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {`Q${index + 1}. ${questions[index]?.question}`}
          </Text>

          <View>
            {questions[index]?.options.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={
                  styles.optionWrapper
                }
                onPress={(e) => handleCheckboxChange(option.optionText, idx+1)}
              >
                <Ionicons
                  name={
                    userPracticePaper[index]?.userSelectAns === idx+1
                      ? 'checkbox'
                      : 'square-outline'
                  }
                  size={20}
                  color={
                    userPracticePaper[index]?.userSelectAns === idx+1 ? '#00B5D8' : '#6B7280'
                  }
                />
                <Text
                  style={[
                    styles.optionText,
                    userPracticePaper[index]?.userSelectAns === idx+1 && styles.selectedOptionText,
                  ]}
                >
                  {option.optionText}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Timer
          qsnChange={qsnChange}
          setSubmitTime={setSubmitTime}
          loading={questionLoading}
        />
        <Statics
          minTime={Number(questions[index]?.minTime)}
          maxTime={Number(questions[index]?.maxTime)}
          avgTime={Number(questions[index]?.avgTime)}
        />

        {
          userPracticePaper[index]?.showHint != null && userPracticePaper[index]?.showHint != undefined && userPracticePaper[index]?.showHint != ""
          && <ShowHint hint={userPracticePaper[index]?.showHint} />
        }
      </ScrollView>

      {index === 0 ? (
        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      ) : index === questions.length - 1 ? (
     
          loader ? <Loader/> :  
          
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>Submit</Text>
        </TouchableOpacity>
      
      ) : (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.singleButtonBack} onPress={prevQuestion}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.singleButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {
        viewDetail && <PaperDetailModel attempt={submitPopupValue.atemmpt} correct={submitPopupValue.correct} incorrect={submitPopupValue.incorrect} total={submitPopupValue.total} submitAssessmentId={submitPopupValue.submitAssessmentId} />
      }
    </View> 
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },

  scrollContent: {
    flexGrow: 1,  
    paddingBottom: 16,   
  },

  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    marginTop: 16
  },

  questionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    lineHeight: 18,
    marginBottom: 8
  },

  optionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },

  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 4,
  },

  selectedOptionText: {
    color: '#00B5D8',
  },

  nextButton: {
    backgroundColor: '#00B5D8',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    elevation: 0,
  },

  nextButtonText: {
    fontSize: 14,
    color: '#f7f7f7',
    fontWeight: '600',
  },

  backButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    elevation: 0,
  },

  backButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    borderRadius: 4,
  },

  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%', 
  },

  singleButton: {
    backgroundColor: '#00B5D8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    elevation: 0,
    width: 150,
    marginHorizontal: 10,
    borderRadius: 4,
  },

  singleButtonBack: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    width: 150,
    marginHorizontal: 10,
    borderRadius: 4,
  },

  hintContainer: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },

  hintText: {
    fontSize: 14,
    color: '#856404',
  },

  noHintText: {
    fontSize: 14,
    color: '#888888',
    marginTop: 16,
  },
});
export default QuizScreen;