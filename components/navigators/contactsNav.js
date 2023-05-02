import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Contacts from '../fragments/contacts';
import ContactUser from '../fragments/contactUser';

const Stack = createNativeStackNavigator();

class ContactsNav extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen
          name="ContactUser"
          component={ContactUser}
          options={{headerShown: true}}/>
      </Stack.Navigator>
    );
  }
}

export default ContactsNav;
