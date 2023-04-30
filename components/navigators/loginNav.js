// import {StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../fragments/login';
import Signup from '../fragments/signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const Stack = createNativeStackNavigator();

class LoginNav extends Component {
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
    if (value !== null) {
      this.props.navigation.navigate('MainAppNav');
    }
  };

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  }
}

export default LoginNav;

{/* <Tab.Screen name="Messages" component={MessageThread} />
<Tab.Screen name="Contacts" component={Contacts} /> */}
