import {View, Pressable, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import globalStyles from '../styles/globalStyles';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isProcessing: false,
      firstName: '',
      lastName: '',
      email: '',
      visibleModal: null,
      errorMessage: '',
    };
  }

  static propTypes = {
    navigation: PropTypes.any,
  };

  logout = async () => {
    if (this.state.isProcessing == true) {
      console.log('Already processing request!');
    } else {
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
              this.setState({isProcessing: false});
              this.props.navigation.navigate('LoginNav');
            } else if (response.status === 401) {
              console.log('Not logged in!');
              this.setState({isProcessing: false});
              this.props.navigation.navigate('LoginNav');
            } else {
              console.log('Something went wrong!');
              this.setState({
                isProcessing: false,
                visibleModal: 1,
                errorMessage: 'There was a problem processing your request, please try again.',
              });
            }
          });
    }
  };

  getDetails = async () => {
    return fetch('http://localhost:3333/api/1.0.0/user/' +
                  await AsyncStorage.getItem('user_id'), {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            firstName: responseJson['first_name'],
            lastName: responseJson['last_name'],
            email: responseJson['email'],
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visibleModal: 1,
            errorMessage: 'There was a problem getting your details, please try again.',
          });
        });
  };

  componentDidMount() {
    this.getDetails();
    this.props.navigation.addListener('focus', this.onFocus);
  }

  onFocus = () => {
    this.setState({isLoading: true});
    this.getDetails();
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
          <Modal isVisible={this.state.visibleModal === 1}
            style={globalStyles.bottomModal}>
            <View style={globalStyles.modalContent}>
              <Text>{this.state.errorMessage}</Text>
              <Pressable onPress={() => this.setState({visibleModal: null})}>
                <View style={globalStyles.modalButton}>
                  <Text>Close</Text>
                </View>
              </Pressable>
            </View>
          </Modal>
        </View>
      );
    } else {
      return (
        <View>
          <View style={profileStyles.txtContainer}>
            <Text style={profileStyles.titleText}>Details</Text>
          </View>
          <View style={profileStyles.txtContainer}>
            <Text style={profileStyles.subHeadText}>First Name</Text>
            <Text style={profileStyles.elements}>{this.state.firstName}</Text>
            <Text style={profileStyles.subHeadText}>Last Name</Text>
            <Text style={profileStyles.elements}>{this.state.lastName}</Text>
            <Text style={profileStyles.subHeadText}>Email</Text>
            <Text style={profileStyles.elements}>{this.state.email}</Text>
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
          <Modal isVisible={this.state.visibleModal === 1}
            style={globalStyles.bottomModal}>
            <View style={globalStyles.modalContent}>
              <Text>{this.state.errorMessage}</Text>
              <Pressable onPress={() => this.setState({visibleModal: null})}>
                <View style={globalStyles.modalButton}>
                  <Text>Close</Text>
                </View>
              </Pressable>
            </View>
          </Modal>
        </View>
      );
    }
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
  subHeadText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Profile;
