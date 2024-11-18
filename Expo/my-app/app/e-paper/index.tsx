import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ActivityIndicator, FlatList } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';
const App = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionLoading, setQuestionLoading] = useState(false);
  
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
      const mcqQuestions = data.filter((item: any) => item.questionType === 'Single Choice');
      setQuestions(mcqQuestions);
      setQuestionLoading(false);
    } catch (error) {
      setQuestionLoading(false);
    }
  };
  useEffect(() => {
    getQuestions("math");
  }, []);
  const shareOnWhatsapp = async () => {
    try {
      await Sharing.shareAsync('Check out this content!');
    } catch (error) {
      console.error('Error sharing on WhatsApp', error);
    }
  };
  const shareOnFacebook = async () => {
    try {
      await Sharing.shareAsync('Check out this content!');
    } catch (error) {
      console.error('Error sharing on Facebook', error);
    }
  };
  const [isPressed, setIsPressed] = React.useState(false);
  return (
    
    <View style={styles.container}>
      <View style={styles.shareButtons}>
        <TouchableOpacity onPress={() => alert('log')} style={styles.logoWrapper}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.shareIconsContainer}>
          <TouchableOpacity onPress={shareOnWhatsapp} style={styles.shareButton}>
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareOnFacebook} style={styles.shareButton}>
            <Ionicons name="logo-facebook" size={24} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareOnFacebook} style={styles.shareButton}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.div}></View>
      <View style={{ marginVertical: 5 }}>
        <Text style={styles.title}>Questions</Text>
        <Text style={styles.content}>List of questions available below:</Text>
        {questionLoading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <FlatList
            data={questions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.questionContainer}>
                <Text style={styles.title}>{`Q${index + 1}. ${item.question}`}</Text>
                <View style={styles.optionsContainer}>
                  {item.options.map((option, optionIndex) => (
                    <Text key={optionIndex} style={styles.optionText}>
                      {`${option.optionFlag}. ${option.optionText}`}
                    </Text>
                  ))}
                  <View style={styles.div2}></View>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.noQuestionsText}>No Questions Available</Text>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.grid}
          />
        )}
      </View>
      {/* Fixed bottom button */}
      <TouchableOpacity style={styles.button2} activeOpacity={0.7}>
        <Text style={styles.buttonText2}>Button Text</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes the full height
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  shareButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoWrapper: {
    marginRight: '45%',
  },
  logo: {
    width: 60,
    height: 70,
  },
  shareIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    marginRight: 20,
  },
  login: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
    marginVertical: 5,
  },
  grid: {
    flexGrow: 1,
    paddingVertical: 10,
    height: '200%',
  },
  button2: {
    backgroundColor: '#00B5D8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    position: 'absolute',
    bottom: 0, 
    left: 0, 
    right: 0,
  },
  buttonText2: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  optionsContainer: {
    marginVertical: 5,
  },
  optionText: {
    fontSize: 14,
    color: '#555',
  },
  questionContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    color: '#333',
  },
  noQuestionsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  div: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  div2: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
});
export default App;