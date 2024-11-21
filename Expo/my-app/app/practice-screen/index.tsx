import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Nav from '../components/Nav';
import { startAssesmentId } from '@/assets/data/dataAndFunction';
import axios from 'axios';

const QuizScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const[questionLoading, setQuestionLoading] = useState<boolean>(false);
  const[questions, setQuestions] = useState([]);
  const[userPracticePaper, setUserPracticePaper] = useState([]);
  const[index, setIndex] = useState<number>(0);
  const options = [
    'oxygen-containing compounds',
    'carbon-containing compounds',
    'proteins and enzymes',
    'carbohydrates',
  ];

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const prevQuestion = ()=>{

  }





  const getPracticePaper = async (startAssesmentId: string) => {
    setQuestionLoading(true);
    try {
      // const response = await axios.get(`https://preppal.club/api/startassesment/${startAssesmentId}`);
      const response = await axios.get(`https://preppal.club/api/startassesment/673f0902f6d2f06f5fd091b7`);

      const data = await response.data;
      const mcqQuestions = data.questions.filter((item: any) => item.questionType == 'Single Choice');
      setQuestions(mcqQuestions);
      setQuestionLoading(false);
      const initialPracticePaper = response?.data?.questions.map((q:any) => ({
        McqQuestion: q,
        userSelectAns: '',
        submitTimeInSeconds:null 
      }));
      setUserPracticePaper(initialPracticePaper);
    } catch (error) {
      console.log(error);
      setQuestionLoading(false);
    }
  };

  useEffect(() => {
    getPracticePaper(startAssesmentId);
  }, []);

  return (
    <View style={styles.container}>
        <Nav/>
      <ScrollView contentContainerStyle={styles.scrollContent}>

         {
           userPracticePaper.map((item)=>
           <View style={styles.questionContainer}>
           <Text style={styles.questionText}>
           {`Q${ 1}. ${item[index]?.question}`}
           </Text>
           <View style={styles.optionsContainer}>
             {options.map((option, index) => (
               <TouchableOpacity
                 key={index}
                 style={[
                   styles.optionWrapper,
                   selectedOptions.includes(option) && styles.selectedOption,
                 ]}
                 onPress={() => toggleOption(option)}
               >
                 <Ionicons
                   name={
                     selectedOptions.includes(option)
                       ? 'checkbox'
                       : 'square-outline'
                   }
                   size={20}
                   color={selectedOptions.includes(option) ? '#00B5D8' : ''}
                 />
                 <Text
                   style={[
                     styles.optionText,
                     selectedOptions.includes(option) && styles.selectedOptionText,
                   ]}
                 >
                   {option}
                 </Text>
               </TouchableOpacity>
             ))}
           </View>
         </View>
           )
         }

      
      </ScrollView>
      <TouchableOpacity style={styles.nextButton} activeOpacity={0.7} >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={prevQuestion}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding:16
  },
  
  btnContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContent:{
       marginVertical:16
  },

  icon: {
    marginRight: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
 
  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 4,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: '#F8F9FA',
  },
  optionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  selectedOption: {
    backgroundColor: '#E8F0FE',
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
    elevation: 2,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#f7f7f7',
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
});

export default QuizScreen;