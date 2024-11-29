import React, { useState, useRef } from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  View, 
  Animated, 
  LayoutAnimation, 
  UIManager, 
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ShowHint = ({hint}) => {
  const [showHints, setShowHints] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;  

  const toggleHints = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
 
    if (!showHints) {
      Animated.timing(animation, {
        toValue: 1,  
        duration: 300, 
        useNativeDriver: true,  
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0, // Fully hidden
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    setShowHints(!showHints);
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={toggleHints}>
        <Text style={styles.text}>
          {showHints ? 'Hide hints' : 'Show hints'}
        </Text>
        {showHints ? (
          <Icon name="chevron-up" style={styles.icon} />
        ) : (
          <Icon name="chevron-down" style={styles.icon} />
        )}
      </TouchableOpacity>
 
      {showHints && (
        <Animated.View 
          style={[
            styles.hintContainer,
            {
              opacity: animation, 
              transform: [{ scale: animation }], 
            },
          ]}
        >
          <Text style={styles.hint}>{"hint"}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:16,
    alignSelf:'center'
  },

  text: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center', 
    marginRight: 8,
  },
  icon: {
    fontSize: 18,
    color: 'black',
  },
  hintContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    marginTop: 16,
  },

  hint:{
    fontSize: 14,  
    color: '#6B7280',
  }
 

});

export default ShowHint;