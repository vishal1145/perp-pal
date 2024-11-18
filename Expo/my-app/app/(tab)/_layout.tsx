import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';  

const TabLayout = () => {
  return (
    <Tabs>
     
      <Tabs.Screen 
        name="index" 
        options={{
          headerShown:false,
          title: 'Home',
          
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }} 
      />
      
      <Tabs.Screen 
        name="profile" 
        options={{
          headerShown:false,
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} /> 
          ),
        }} 
      />
    </Tabs>
  );
};

export default TabLayout;
