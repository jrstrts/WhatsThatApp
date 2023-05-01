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
      <View>
        <View style={profileStyles.txtContainer}>
          <Text style={profileStyles.titleText}>Details</Text>
        </View>
        <View style={profileStyles.buttonContainer}>
          <Pressable
            style={[profileStyles.submitButton, profileStyles.elements]}
            onPress={() => {
              this.props.navigation.navigate('ChangeDetails');
            }}>
            <Text style={profileStyles.buttonText}>Edit</Text>
          </Pressable>
        </View>
        <View style={profileStyles.txtContainer}>
          <Text style={profileStyles.titleText}>Account Actions</Text>
        </View>
        <View style={profileStyles.buttonContainer}>
          <Pressable
            style={[profileStyles.logoutButton, profileStyles.elements]}
            onPress={() => {
              this.logout();
            }}>
            <Text style={profileStyles.buttonText}>Log Out</Text>
          </Pressable>
        </View>
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
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
  },
  txtContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
    padding: 15,
  },
  inputs: {
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: 50,
    backgroundColor: 'lightgrey',
    borderColor: '#fff',
  },
  elements: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#54ADFF',
    borderRadius: 10,
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default Profile;
