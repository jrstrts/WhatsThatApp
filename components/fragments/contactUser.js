import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ContactUser extends Component {
  static propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.any,
  };

  removeContact = async () => {
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.userID}/contact`, {
      method: 'DELETE',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => {
          if (response.status === 200) {
            console.log('200: OK');
            this.props.navigation.goBack();
          } else if (response.status === 400) {
            console.log('400: Removing yourself');
          } else if (response.status === 401) {
            console.log('401: Not Logged in');
          } else if (response.status === 404) {
            console.log('404: User not found');
          } else {
            console.log('Something went wrong!');
          }
        });
  };

  render() {
    return (
      <View>
        <View style={userStyles.txtContainer}>
          <Text style={userStyles.titleText}>Contact Details</Text>
        </View>
        <View style={userStyles.txtContainer}>
          <Text style={userStyles.subHeadText}>First Name</Text>
          <Text style={userStyles.elements}>
            {this.props.route.params.firstName}
          </Text>
          <Text style={userStyles.subHeadText}>Last Name</Text>
          <Text style={userStyles.elements}>
            {this.props.route.params.lastName}
          </Text>
          <Text style={userStyles.subHeadText}>Email</Text>
          <Text style={userStyles.elements}>
            {this.props.route.params.email}
          </Text>
        </View>

        <View style={userStyles.txtContainer}>
          <Text style={userStyles.titleText}>Remove Contact</Text>
        </View>
        <View style={userStyles.buttonContainer}>
          <Pressable
            style={[userStyles.removeButton, userStyles.elements]}
            onPress={() => {
              this.removeContact();
            }}>
            <Text style={userStyles.buttonText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const userStyles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '10%',
    padding: 15,
  },
  txtContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
    padding: 15,
  },
  elements: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  removeButton: {
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
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subHeadText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ContactUser;
