import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

type TimerProps = {
  qsnChange: number;
  setSubmitTime: (timeInSeconds: number, qsnChange: number, totalSeconds: number, totalMinutes: number, totalHours: number) => void;
  loading: boolean;
};

const Timer: React.FC<TimerProps> = ({ qsnChange, setSubmitTime, loading }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  

  const getTotalSeconds = (sec: number, min: number, hr: number) => {
    return sec + min * 60 + hr * 3600;
  };
 
 
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds < 59) {
          return prevSeconds + 1;
        } else {
          if(minutes < 59){
            setMinutes(minutes+1);
          }else{
            setHours(hours+1);
            setMinutes(0);
          }
       
          return 0;  
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{  
    const timeInSeconds = getTotalSeconds(seconds, minutes, hours)
    setSubmitTime(timeInSeconds, qsnChange,  seconds, minutes, hours);

    setHours(0);
    setMinutes(0);
    setSeconds(0); 
}, [qsnChange]);



  if (loading) {
    return (
      <View style={styles.loaderWrapper}>
        <ActivityIndicator size="large" color="#00B5D8" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.Statistics}>Timer</Text>
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Text style={styles.timeText}>{String(hours).padStart(2, '0')}</Text>
          <Text style={styles.label}>Hours</Text>
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timeText}>{String(minutes).padStart(2, '0')}</Text>
          <Text style={styles.label}>Minutes</Text>
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timeText}>{String(seconds).padStart(2, '0')}</Text>
          <Text style={styles.label}>Seconds</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    marginTop: 16,
  },

  Statistics: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginBottom:8,
    marginRight:14
  },
 
  container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between', 
      width: '100%',
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
  colonText: {
    fontSize: 36,
    fontWeight: '600',
    color: '#00B5D8',
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Timer;
