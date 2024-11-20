import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';  

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons 
              name="home" 
              size={size} 
              color={focused ? "#00B5D8" : color}   
            />
          ),
          tabBarLabelStyle: {
            color: 'black',   
          },
        }} 
      />
      
      <Tabs.Screen 
        name="profile" 
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons 
              name="account-circle" 
              size={size} 
              color={focused ? "#00B5D8" : color}   
            />
          ),
          tabBarLabelStyle: {
            color: 'black',   
          },
        }} 
      />
    </Tabs>
  );
};

export default TabLayout;