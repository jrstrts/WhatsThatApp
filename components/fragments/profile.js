import {View, Pressable, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.any,
  };

  logout = async () => {
    console.log('log out');

    return fetch('http://localhost:3333/api/1.0.0/logout', {
      method: 'post',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then(async (response) => {
          if (response.status === 200) {
            await AsyncStorage.removeItem('session_token');
            await AsyncStorage.removeItem('user_id');
            this.props.navigation.navigate('LoginNav');
          } else if (response.status === 401) {
            console.log('Not logged in!');
            this.props.navigation.navigate('LoginNav');
          } else if (response.status === 500) {
            console.log('Server error!');
          } else {
            console.log('Something went wrong!');
          }
        });
  };

  render() {
    return (
      <View style={profileStyles.buttonContainer}>
        <Pressable
          style={[profileStyles.button]}
          onPress={() => {
            this.logout();
          }}>
          <Text style={profileStyles.buttonText}>Log Out</Text>
        </Pressable>
      </View>
    );
  }
}

const profileStyles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '10%',
    padding: 15,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default Profile;
