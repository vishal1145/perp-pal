import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Use Expo's router or adjust as per your navigation setup
import { FontAwesome } from '@expo/vector-icons'; // For icons like search and microphone

export default function AdaptiveLearningOverview() {
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);
  const router = useRouter();

  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      let timeoutId;
      recognition.start();
      recognition.onresult = (event) => {
        const results = event.results;
        const transcript = results[results.length - 1][0].transcript;
        setSearchText(transcript);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          recognition.stop();
        }, 2000);
      };
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
      recognition.onend = () => {
        clearTimeout(timeoutId);
      };
    } else {
      Alert.alert('Speech Recognition', 'Your device does not support speech recognition.');
    }
  };

  useEffect(() => {
    // Focus the search input on mount
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.nativeEvent.key === 'Enter' && searchText.trim() !== '') {
      const formattedText = searchText.trim().replace(/\s+/g, '-');
      router.push(`/e-paper`);
    }
  };

  const handleClick = () => {
    const formattedText = searchText.trim().replace(/\s+/g, '-');
    router.push(`/e-paper`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Adaptive Learning System: Step-by-Step Guide</Text>
      <Text style={styles.intro}>
        Welcome to our smart adaptive learning platform, where you can create personalized practice papers, get
        immediate feedback, and follow a tailored learning path for better academic growth. Below is a detailed guide on
        how the system works from start to finish.
      </Text>

      {/* Step 1 */}
      <View style={styles.step}>
        <Text style={styles.stepTitle}>Step 1: Describe Your Practice Paper</Text>
        <Text style={styles.stepText}>
          To get started, users are prompted to input a detailed description of the paper they want to generate. This
          description can include:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Subject: Choose from a wide variety of subjects (e.g., Mathematics, Science).</Text>
          <Text style={styles.listItem}>
            • Class/Grade Level: Indicate the academic level (e.g., Grade 6, High School, Undergraduate).
          </Text>
          <Text style={styles.listItem}>• Topics/Chapters: Specify chapters or topics to focus on (e.g., Algebra).</Text>
          <Text style={styles.listItem}>• Question Type: Choose multiple-choice questions (MCQs) as the format.</Text>
          <Text style={styles.listItem}>• Difficulty Level: Define the difficulty level (easy, medium, hard).</Text>
          <Text style={styles.listItem}>• Number of Questions: Indicate how many questions you want (e.g., 10, 20).</Text>
        </View>
        <Text style={styles.stepText}>
          Once the description is entered, our system analyzes it and creates a custom paper within seconds, perfectly
          aligned with your specifications.
        </Text>
      </View>

      {/* Input and Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <FontAwesome name="search" size={16} color="#888" style={styles.iconLeft} />
          <TextInput
            ref={searchInputRef}
            style={styles.input}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            onKeyPress={handleKeyDown}
          />
          <FontAwesome name="microphone" size={16} color="#888" style={styles.iconRight} onPress={handleMicClick} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Start Practice</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#f5f5f5',
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  },
  intro: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'justify',
  },
  step: {
    backgroundColor: '#f5f5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 8,
  },
  list: {
    marginTop: 8,
  },
  listItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 22,
  },
  searchContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
    maxWidth: 400,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 8,
    color: '#333',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#007bff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
