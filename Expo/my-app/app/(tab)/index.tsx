import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
 
import { useRouter } from 'expo-router';
import { data } from '@/assets/data/data';
import Voice from 'react-native-voice';


const App = () => {
  const [searchText, setSearchText] = useState('');
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const records = data.records;
  const router = useRouter();

  const handleMouseEnter = (id) => {
    setHoveredCardId(id); 
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
  };

  const handleTouch = (id) => {
    setHoveredCardId(id); 
    router.push(`/e-paper?id=${id}`); 
  };

  const handleTouchOut = () => {
    setHoveredCardId(null); 
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      router.push(`/e-paper?query=${encodeURIComponent(searchText)}`); 
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo1.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          accessible
          accessibilityLabel="Search Input"
        />
        
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="mic" size={20} color="#888"  style={styles.icon} />
        </TouchableOpacity>
        
      </View>

  
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onMouseEnter={() => handleMouseEnter(item.id)} 
            onMouseLeave={handleMouseLeave} 
            onPress={() => handleTouch(item.id)} 
            onPressOut={handleTouchOut} 
          >
            <Text style={styles.prompt_text}>{item.prompt_text}</Text>
            
            {hoveredCardId === item.id && (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>{item.prompt_Description}</Text>
                <View style={styles.tooltipArrow} />
              </View>
            )}
          </TouchableOpacity>
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
    padding: 16,
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
    marginBottom: 10,
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
  },
  card: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    position: 'relative',
  },
  prompt_text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  tooltip: {
    position: 'absolute',
    left: '50%',
    bottom: '100%',
    transform: [{ translateX: '-50%' }],
    backgroundColor: '#4B5563',
    borderRadius: 6,
    zIndex: 10,
    marginBottom: 5,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  tooltipArrow: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#4B5563',
    transform: [{ rotate: '45deg' }],
    left: '50%',
    bottom: -5,
    marginLeft: -5,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
