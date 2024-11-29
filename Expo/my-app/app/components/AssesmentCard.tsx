import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type AssessmentCardProps = {
  title: string;
  value: string;
  width?:string;
};

const AssessmentCard: FC<AssessmentCardProps> = ({ title, value, width='47%' }) => {
  return (
    <TouchableOpacity style={{
        backgroundColor: '#f3f4f6',  
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowOffset: { width: 0, height: 4 },  
        shadowRadius: 6, 
        elevation: 2,  
        alignItems: 'center',
        justifyContent: 'center',
        width:width
    }}>
      <View>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
 
  valueText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center',
    color: 'black',
  },
  titleText: {
    color: '#4b5563', 
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default AssessmentCard;
