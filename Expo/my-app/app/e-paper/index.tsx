import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';

const App = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionLoading, setQuestionLoading] = useState(false);
  const { width } = Dimensions.get('window');

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
      const dataSingh = [...mcqQuestions, ...mcqQuestions]
      setQuestions(dataSingh);
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

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoWrapper}>
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
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Questions Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Questions</Text>
        <Text style={styles.sectionSubtitle}>List of questions available below:</Text>
        {questionLoading ? (
          <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} />
        ) : (
          <FlatList
            data={questions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.questionCard}>
                <Text style={styles.questionText}>{`Q${index + 1}. ${item.question}`}</Text>
                <View style={styles.optionsContainer}>
                  {item.options.map((option, optionIndex) => (
                    <Text key={optionIndex} style={styles.optionText}>
                      {`${option.optionFlag}. ${option.optionText}`}
                    </Text>
                  ))}
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.noQuestionsText}>No Questions Available</Text>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      {/* Footer Button */}
      <TouchableOpacity style={[styles.footerButton, { width }]} activeOpacity={0.7}>
        <Text style={styles.footerButtonText}>Start Practice</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
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
    marginHorizontal: 10,
  },
  loginButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  questionCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
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
    borderRadius: 8,
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
