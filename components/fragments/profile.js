import {View, Pressable, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      statusText: '',
      statusColor: 'black',
    };
  }

  static propTypes = {
    navigation: PropTypes.any,
  };

  handleFirstNameInput = (firstName) => {
    if (this.state.statusText != '') {
      this.setState({statusText: ''});
    }
    this.setState({firstName: firstName});
  };

  handleLastNamelInput = (lastName) => {
    if (this.state.statusText != '') {
      this.setState({statusText: ''});
    }
    this.setState({lastName: lastName});
  };

  handleEmailInput = (email) => {
    if (this.state.statusText != '') {
      this.setState({statusText: ''});
    }
    this.setState({email: email});
  };

  handlePasswordInput = (password) => {
    if (this.state.statusText != '') {
      this.setState({statusText: ''});
    }
    this.setState({password: password});
  };

  sendUpdate = async () => {
    return fetch('http://localhost:3333/api/1.0.0/user/' +
                  await AsyncStorage.getItem('user_id'), {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => response.json())
        .then(async (responseJson) => {
          // const is innapropriate for next line, but eslint doesn't agree
          // eslint-disable-next-line prefer-const

          let dataToSend = {};

          if (this.state.firstName != responseJson['first_name'] &&
              this.state.firstName != '') {
            dataToSend['first_name'] = this.state.firstName;
          }

          if (this.state.lastName != responseJson['last_name'] &&
              this.state.lastName != '') {
            dataToSend['last_name'] = this.state.lastName;
          }

          if (this.state.email != responseJson['email'] &&
              this.state.email != '') {
            dataToSend['email'] = this.state.email;
          }

          if (this.state.password != '') {
            dataToSend['password'] = this.state.password;
          }

          console.log(JSON.stringify(dataToSend));

          if (dataToSend != {}) {
            return fetch('http://localhost:3333/api/1.0.0/user/' +
                          await AsyncStorage.getItem('user_id'), {
              method: 'PATCH',
              headers: {
                'X-Authorization': await AsyncStorage.getItem('session_token'),
                'content-type': 'application/json',
              },
              body: JSON.stringify(dataToSend),
            })
                .then((response) => {
                  if (response.status === 200) {
                    console.log('Update success!');
                  } else if (response.status === 400) {
                    console.log('400: Bad Request (bad data)');
                  } else if (response.status === 403) {
                    console.log('403: Forbidden (editing wrong user?)');
                  } else if (response.status === 404) {
                    console.log('404: Not Found (user does not exist)');
                  } else if (response.status === 401 ||
                             response.status === 500) {
                    console.log('401 or 500: Something has gone wrong!');
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
          }
        });
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
          <Text style={profileStyles.titleText}>Change Details</Text>
          <Text>Only change the fields you wish to edit</Text>
        </View>
        <View style={profileStyles.inputContainer}>
          <TextInput
            style={[profileStyles.inputs, profileStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='text'
            placeholder='First Name'
            onChangeText={this.handleFirstNameInput}
            value={this.state.firstName}
          />
          <TextInput
            style={[profileStyles.inputs, profileStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='text'
            placeholder='Last Name'
            onChangeText={this.handleLastNamelInput}
            value={this.state.lastName}
          />
          <TextInput
            style={[profileStyles.inputs, profileStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='email'
            placeholder='Email'
            onChangeText={this.handleEmailInput}
            value={this.state.email}
          />
          <TextInput
            style={[profileStyles.inputs, profileStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='text'
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={this.handlePasswordInput}
            value={this.state.password}
          />
        </View>
        <View style={profileStyles.buttonContainer}>
          <Pressable
            style={[profileStyles.submitButton, profileStyles.elements]}
            onPress={() => {
              this.sendUpdate();
            }}>
            <Text style={profileStyles.buttonText}>Submit</Text>
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
