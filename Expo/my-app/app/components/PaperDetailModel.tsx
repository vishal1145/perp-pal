import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // To navigate
import { Ionicons } from '@expo/vector-icons'; // For microphone icon
import AssessmentCard from './AssesmentCard';
import Icon from 'react-native-vector-icons/Feather'; 
import { prompt_text } from '@/assets/data/dataAndFunction';
import { useRouter } from 'expo-router';
type paperDetailModelProps = {
  message: string;
  total: number;
  attempt: number;
  correct: number;
  incorrect: number;
  submitAssessmentId: string;
};

const PaperDetailModel: React.FC<paperDetailModelProps> = ({
  total,
  attempt, 
  correct,
  incorrect,
  submitAssessmentId
}) => {
  const navigation = useNavigation();
  const searchInputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  
  const handleMicClick = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      let timeoutId: NodeJS.Timeout;

      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setSearchText(transcript);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          recognition.stop();
        }, 2000);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };

      recognition.onend = () => {
        clearTimeout(timeoutId);
      };
    } else {
      Alert.alert('Speech recognition not supported on this device');
    }
  };

  const handleStartPracticeClick = () => {
    const formattedText = searchText.trim().replace(/\s+/g, '--');
    router.push(`/e-paper?paper=${formattedText}`); 
  };

  const resultPage = () => {
    console.log("working");
    return
    router.push('ResultScreen', { id: submitAssessmentId });
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.title}>Assessment Score</Text>
        </View>
        
        <Text style={styles.subTitle}>{prompt_text}</Text>
        
        <View style={styles.cardContainer}>
        <AssessmentCard title='Total' value={String(total)} />
        <AssessmentCard title='Attempted' value={String(attempt)} />
        </View>
        <AssessmentCard title='Correct / Incorrect' value={`${String(correct)} / ${String(incorrect)}`} width={'100%'}/>
        <View>
      <View style={styles.row}>
        <TouchableOpacity onPress={resultPage} style={styles.summaryContainer}>
          <Text style={[styles.text ]}>View Detail Summary</Text>
          <Icon name="arrow-right" size={20} color="black" />  
        </TouchableOpacity>
      </View>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={[styles.text ]}>OR</Text>
        <View style={styles.separator} />
      </View>
    </View>
        
        <Text style={styles.messageText}>
          <Text style={styles.bold}>Don't let your last attempt discourage you!</Text>
          <Text> It’s perfectly normal to face challenges while studying. Remember, every question is an opportunity to learn and improve!</Text>
        </Text>

        <Text style={styles.bold}>Ready to tackle more?</Text>
        <Text style={styles.messageText}>Generate a new MCQ-based test on Life Processes for Class 10 Biology and sharpen your skills.</Text>

        <Text style={styles.bold}>Click below to start your next practice test!</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput
            ref={searchInputRef}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Type a text to generate"
            style={styles.searchInput}
          />
          <Ionicons name="mic" size={24} color="gray" style={styles.micIcon} onPress={handleMicClick} />
        </View>

        <TouchableOpacity style={styles.startPracticeButton} onPress={handleStartPracticeClick}>
          <Text style={styles.startPracticeText}>Start Practice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    padding: 16,
  },
  modalHeader: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  viewDetailsButton: {
    marginVertical: 10,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#007BFF',
    fontSize: 16,
  },
  messageText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: 'gray',
    marginBottom:16
  },

  questionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    lineHeight: 18,
  },

  optionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },

  bold: {
    fontWeight: 'bold',
    marginBottom:16
  },
  startPracticeButton: {
    backgroundColor: '#00B5D8',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  startPracticeText: {
    color: 'white',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom:16
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  micIcon: {
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    marginRight:4
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:16
  },
  separator: {
    flexGrow: 1,
    height: 1,
    backgroundColor: '#d1d5db',  
   
  },
});

export default PaperDetailModel;