// import {StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Contacts from '../fragments/contacts';
import ChatNav from '../navigators/chatNav';
import Profile from '../fragments/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

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
        <Tab.Screen name="Contacts" component={Contacts} />
        <Tab.Screen name='Profile' component={Profile} />
      </Tab.Navigator>
    );
  }
}

export default MainAppNav;

{/* <Tab.Screen name="Messages" component={MessageThread} />
<Tab.Screen name="Contacts" component={Contacts} /> */}
