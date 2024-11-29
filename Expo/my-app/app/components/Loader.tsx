import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

 
const Loader = ( ) => {
  return (
    <View style={styles.loaderWrapper}>
    <ActivityIndicator size="large" color="#00B5D8" />
  </View>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Loader;
