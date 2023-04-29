import {View, Pressable, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.any,
  };

  logout = () => {
    console.log('log out');
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
