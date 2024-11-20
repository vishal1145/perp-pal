import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';

const ProfilePage = () => {
  const screenWidth = Dimensions.get('window').width;
  const[user, setUser] = useState({});

  const chartConfig = {
    backgroundGradientFrom: "#f0f0f0",
    backgroundGradientTo: "#f0f0f0",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const data = {
    labels: ["1", "2", "3", "4"],
    datasets: [
      {
        data: [3, 2.5, 1.5, 3],
      },
    ],
  };
  
  const getAboutUser = async()=>{
    try {
      let response = await axios.put(`https://preppal.club/api//users/about/673c640319a6dc997e0ea738`);
      setUser(response.data);
      console.log('djdhvsdv', response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAboutUser();
  }, [])

  return (
    <ScrollView style={styles.container}> 
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/profileImage.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.username}</Text>
        <Text style={styles.location}>{user.address}</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Text>✏️</Text>
        </TouchableOpacity>
      </View>
 
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.description}>{user.about}</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Text>✏️</Text>
        </TouchableOpacity>
      </View>
 
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={[styles.card2 ]}>
    <Text style={styles.sectionTitle}>Total Assessments</Text>
    <Text style={styles.value}>3</Text>
  </View>
  <View style={styles.card2}>
    <Text style={styles.sectionTitle}>Today Assessments</Text>
    <Text style={styles.value}>0</Text>
  </View>
</View>
      
 
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Total Data</Text>
        <BarChart
          data={data}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

   
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>History</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding:16,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
  },

  card2:{
    backgroundColor: '#f0f0f0',
    borderRadius: 10, 
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  location: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chart: {
    marginTop: 10,
  },
});

export default ProfilePage;
