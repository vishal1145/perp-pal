import React  from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';
 

const Nav = () => {
    const shareOnWhatsApp = () => {
        const message = encodeURIComponent(`Check out this page: https://preppal.club/e-paper/Explain--Newton's--three--laws--of--motion.`);   
        const whatsappUrl = `whatsapp://send?text=${message}`;   
        Linking.openURL(whatsappUrl).catch(() => {
          alert('Make sure WhatsApp is installed on your device.');
        });
      };
    
      const shareOnFacebook = () => {
        const urlToShare = `Check out this page: https://preppal.club/e-paper/Explain--Newton's--three--laws--of--motion.`;  
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
        Linking.openURL(facebookUrl).catch(() => {
          alert("Unable to open Facebook. Please ensure the app or browser is installed.");
        });
      };
    
  return (
    <View style={styles.header}>
        <TouchableOpacity style={styles.logoWrapper} onPress={() => router.push('(tab)')}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.shareIconsContainer}>
          <TouchableOpacity onPress={shareOnWhatsApp} style={styles.shareButton}>
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
  )
}


const styles = StyleSheet.create({
    fontMedium: {
      fontWeight: '500', 
    },
    textSm: {
      fontSize: 14, 
      lineHeight: 18, 
    },
    
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      marginRight: 16,
    },
    loginButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: '#00B5D8',
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
      fontSize: 14,
      fontWeight: '600',
      color: '#333',
      marginBottom: 4,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: '#6B7280',
      marginBottom:10
    },
   
  });

export default Nav