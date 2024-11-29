import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type StaticProps = {
  minTime: number;
  maxTime: number;
  avgTime: number;
};

const Statics: React.FC<StaticProps> = ({ minTime, maxTime, avgTime }) => {
 
  const convertSectoMint = (seconds:number)=>{
    const roundedSeconds = Math.round(seconds);
    const minutes = Math.floor(roundedSeconds / 60);
    const secs = roundedSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;  
  }

  return (
    <View style={styles.mainContainer}> 
          <Text style={styles.Statistics}>Statistics</Text>
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timeText}>
          {minTime === Number.MAX_VALUE ? '0:00' : convertSectoMint(minTime)}
        </Text>
        <Text style={[  styles.label]}>Min</Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timeText}>{convertSectoMint(maxTime)}</Text>
        <Text style={[ styles.label]}>Max</Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timeText}>{convertSectoMint(avgTime)}</Text>
        <Text style={[ styles.label]}>Avg</Text>
      </View>

    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        elevation: 2,
        marginTop:16
    },

    Statistics:{
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginBottom:8,
    },
  
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },

  timerContainer: {
    alignItems: 'center',
  },

  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },

  label: {
    textAlign: 'center',
    fontSize: 14,
    color: '#00B5D8',
    marginTop: 8,
  },
});

export default Statics;
