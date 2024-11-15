import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const questions = [
  "What is the principle of superposition?",
  "Define isotopes.",
  "What is the role of enzymes in biological reactions?",
  "What are the types of chemical bonds?",
  "What are the uses of radioisotopes?",
  "Define cellular respiration.",
  "What is homeostasis?",
  "What are the laws of thermodynamics?",
];

const App = () => {
  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/images/logo1.png')}
        style={styles.logo}
        resizeMode="contain"
      />

     
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          accessible
          accessibilityLabel="Search Input"
        />
        <Ionicons name="mic" size={20} color="#888" style={styles.icon} />
      </View>

  
      <FlatList
        data={questions}
        keyExtractor={(item, index) => `${item}-${index}`}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.grid}
        ListEmptyComponent={<Text style={styles.emptyText}>No questions available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6200ea',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  icon: {
    marginHorizontal: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  grid: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
