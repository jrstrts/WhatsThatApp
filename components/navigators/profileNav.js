import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../fragments/profile';
import ChangeDetails from '../fragments/changeDetails';

const Stack = createNativeStackNavigator();

class ProfileNav extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="ChangeDetails"
          component={ChangeDetails}
          options={{headerShown: true}}/>
      </Stack.Navigator>
    );
  }
}

export default ProfileNav;
