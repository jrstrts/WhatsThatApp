// import {StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';

import ContactsNav from '../navigators/contactsNav';
import ChatNav from '../navigators/chatNav';
import ProfileNav from '../navigators/profileNav';


const Tab = createBottomTabNavigator();

class MainAppNav extends Component {
  static propTypes = {
    navigation: PropTypes.any,
  };

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('session_token');
    if (value == null) {
      this.props.navigation.navigate('LoginNav');
    }
  };

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="ChatNav"
          component={ChatNav}
          options={{headerShown: true, title: 'Chats'}}/>
        {/* for some reason the above options remove the back button where
         headerBackVisible does not :) */}
        <Tab.Screen
          name='ContactsNav'
          component={ContactsNav}
          options={{
            headerShown: true,
            title: 'Contacts',
            headerRight: () => (
              <Pressable
                onPress={() => console.log('Button!')}
                style={{paddingRight: 10}}
              >
                <Ionicons name="add-outline" size={32} />
              </Pressable>
            ),
          }}
        />
        <Tab.Screen
          name='ProfileNav'
          component={ProfileNav}
          options={{headerShown: true, title: 'Profile'}} />
      </Tab.Navigator>
    );
  }
}

export default MainAppNav;

{/* <Tab.Screen name="Messages" component={MessageThread} />
<Tab.Screen name="Contacts" component={Contacts} /> */}
