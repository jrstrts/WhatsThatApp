// import {StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import Ionicons from '@expo/vector-icons/Ionicons';
import {FontAwesome} from '@expo/vector-icons';
import {Pressable, View, StyleSheet} from 'react-native';

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
      <Tab.Navigator screenOptions={{tabBarLabelPosition: 'beside-icon'}}>
        <Tab.Screen
          name="ChatNav"
          component={ChatNav}
          options={{
            headerShown: true,
            title: 'Chats',
            tabBarIcon: ({focused, color, size}) => {
              let iconName = iconName = focused ? 'chatbox' : 'chatbox-outline';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerRight: () => (
              <View style={AppNavStyles.buttonContainer}>
                <Pressable
                  onPress={() => this.props.navigation.navigate(
                      'ChatNav', {screen: 'AddChat'} )}
                  style={{paddingRight: 20}}
                >
                  <Ionicons name="add" size={32} />
                </Pressable>
              </View>
            ),
          }}/>
        {/* for some reason the above options remove the back button where
         headerBackVisible does not :) */}
        <Tab.Screen
          name='ContactsNav'
          component={ContactsNav}
          options={{
            headerShown: true,
            title: 'Contacts',
            tabBarIcon: ({focused, color, size}) => {
              let iconName = iconName = focused ? 'person' : 'person-outline';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerRight: () => (
              <View style={AppNavStyles.buttonContainer}>
                <Pressable
                  onPress={() => this.props.navigation.navigate(
                      'ContactsNav', {screen: 'Blocked'} )}
                  style={{paddingRight: 20}}
                >
                  <FontAwesome name="ban" size={32} />
                </Pressable>
                <Pressable
                  onPress={() => this.props.navigation.navigate(
                      'ContactsNav', {screen: 'Search'} )}
                  style={{paddingRight: 20}}
                >
                  <Ionicons name="search" size={32} />
                </Pressable>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name='ProfileNav'
          component={ProfileNav}
          options={{
            headerShown: true,
            title: 'Profile',
            tabBarIcon: ({focused, color, size}) => {
              let iconName = iconName = focused ?
              'person-circle' :
              'person-circle-outline';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }} />
      </Tab.Navigator>
    );
  }
}

const AppNavStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default MainAppNav;
