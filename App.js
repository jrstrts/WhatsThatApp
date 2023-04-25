import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginNav from './components/navigators/loginNav';
import MainAppNav from './components/navigators/mainAppNav';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerBackVisible= 'false'
      >
        <Stack.Screen
          name='LoginNav'
          component={LoginNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='MainAppNav'
          component={MainAppNav}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
