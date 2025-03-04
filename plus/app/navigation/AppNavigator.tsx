import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#121212' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            headerShown: true,
            headerTitle: 'Profile & Friends',
            headerStyle: {
              backgroundColor: '#1a1a1a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 