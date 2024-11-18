import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const ProfilePage = () => {
  const screenWidth = Dimensions.get('window').width;

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

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/profileImage.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Muskan</Text>
        <Text style={styles.location}>noida</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Text>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* About Me Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.description}>this is about section</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Text>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Assessments Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Total Assessments</Text>
        <Text style={styles.value}>3</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Today Assessments</Text>
        <Text style={styles.value}>0</Text>
      </View>

      {/* Chart Section */}
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
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
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
