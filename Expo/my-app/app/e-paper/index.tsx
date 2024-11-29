import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { prompt_text, setAssesmentId } from '@/assets/data/dataAndFunction';
import { useRouter } from 'expo-router';
import axios from 'axios'; 
import Nav from '../components/Nav';

const App = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionLoading, setQuestionLoading] = useState(false);
  const { width } = Dimensions.get('window');
  const router = useRouter();
  const[startPracticeClicked, setStartPracticeClicked] = useState<boolean>(false);
  const getQuestions = async (text: string) => {
    setQuestionLoading(true);
    try {
      const response = await fetch(`https://preppal.club/api/get/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await response.json();
      const mcqQuestions = data.filter((item: any) => item.questionType == 'Single Choice');
      setQuestions(mcqQuestions);
      setQuestionLoading(false);
    } catch (error) {
      setQuestionLoading(false);
    }
  };

  useEffect(() => {
    getQuestions(prompt_text);
  }, []);
 
  const startPractice = async()=>{
    setStartPracticeClicked(true);
     try {
      const response =  await axios.post(`https://preppal.club/api/questions`, questions);
      const quetionsIds =  response.data?.quetionsIds;
      const {data} =  await axios.post(`https://preppal.club/api/startassesment`, {quetionsIds:quetionsIds, userId:null});
      router.push(`/practice-screen`);
      setAssesmentId(data.saveStartAssesment._id);
      setStartPracticeClicked(false);
     } catch (error) {
      console.log(error);
      setStartPracticeClicked(false);
     }
  }

  return (
    <View style={styles.container}>
      <Nav/>
      <View style={styles.divider} />
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Your Questions</Text>
        <Text style={styles.sectionSubtitle}>{prompt_text}</Text>
        {questionLoading ? (
          <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} />
        ) : (
          <FlatList
            data={questions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View  >
                <Text style={styles.questionText}>{`Q${index + 1}. ${item.question}`}</Text>
                <View >
                  {item.options.map((option, optionIndex) => (
                    <Text key={optionIndex} style={styles.optionText}>
                      {`${option.optionFlag}. ${option.optionText}`}
                    </Text>
                  ))}
                </View>
                <View style={{   borderBottomWidth: 1, borderBottomColor: '#f2f2f2'}} />
              </View>
            )}
            ListEmptyComponent={<Text style={styles.noQuestionsText}>No Questions Available</Text>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

    {
        startPracticeClicked === true ? 
         <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} /> :
        <TouchableOpacity style={[styles.footerButton, { width }]} activeOpacity={0.7} onPress={startPractice}>
        <Text style={styles.footerButtonText}>Start Practice</Text>
      </TouchableOpacity>
    }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },

  fontMedium: {
    fontWeight: '500', 
  },
  textSm: {
    fontSize: 14, 
    lineHeight: 18,  
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logoWrapper: {
    flex: 1,
  },
  logo: {
    width: 60,
    height: 60,
  },
  shareIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    marginRight: 16,
  },
  loginButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#00B5D8',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 16,
  },
  contentContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom:10
  },
  loadingIndicator: {
    marginTop: 20,
  },
  questionCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginVertical: 16,
    lineHeight: 18,
  },
   
  optionText: {
    fontSize: 13,  
    color: '#6B7280',  
    marginBottom: 16,
  },
  
  noQuestionsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 80,
  },
  footerButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#00B5D8',
    paddingVertical: 16,
    elevation: 4,
    alignSelf: 'center',
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;