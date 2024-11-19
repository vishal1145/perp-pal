import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';  

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" size={size} color={color} />
          ),
        }} 
      />
      
      <Tabs.Screen 
        name="profile" 
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
};

export default TabLayout;

