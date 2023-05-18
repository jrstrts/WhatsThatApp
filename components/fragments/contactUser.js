import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import globalStyles from '../styles/globalStyles';

import ContactUserDetails from '../elements/contactUserDetails';

class ContactUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      contactData: [],
      blockedUserData: [],
      isContact: false,
      isBlocked: false,
      visibleModal: null,
      errorMessage: '',
    };
  };

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
            this.setState({
              visibleModal: 1,
              errorMessage: 'You cannot remove yourself as a contact',
            });
          } else if (response.status === 404) {
            console.log('404: User not found');
            this.setState({
              visibleModal: 1,
              errorMessage: 'User was not found, try again',
            });
          } else {
            console.log('Something went wrong!');
            this.setState({
              visibleModal: 1,
              errorMessage: 'There was a problem processing your request, please try again',
            });
          }
        });
  };

  addContact = async () => {
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.userID}/contact`, {
      method: 'POST',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => {
          if (response.status === 200) {
            console.log('200: OK');
            this.props.navigation.goBack();
          } else if (response.status === 400) {
            this.setState({
              visibleModal: 1,
              errorMessage: 'You cannot remove yourself as a contact',
            });
          } else if (response.status === 404) {
            console.log('404: User not found');
            this.setState({
              visibleModal: 1,
              errorMessage: 'User was not found, try again',
            });
          } else {
            console.log('Something went wrong!');
            this.setState({
              visibleModal: 1,
              errorMessage: 'There was a problem processing your request, please try again',
            });
          }
        });
  };

  isContact = async () => {
    this.setState({isLoading: true});
    return fetch('http://localhost:3333/api/1.0.0/contacts', {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            contactData: responseJson,
          }, () => {
            try {
              this.state.contactData.find(
                  (x) => x.user_id === this.props.route.params.userID,
              ).user_id;
              this.setState({isContact: true});
            } catch (TypeError) {
              this.setState({isContact: false});
            }
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visibleModal: 1,
            errorMessage: 'There was a problem retrieving this users information, please try again.',
          });
        });
  };

  isBlocked = async () => {
    this.setState({isLoading: true});
    return fetch('http://localhost:3333/api/1.0.0/blocked', {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            blockedUserData: responseJson,
          }, () => {
            try {
              this.state.blockedUserData.find(
                  (x) => x.user_id === this.props.route.params.userID,
              ).user_id;
              this.setState({isBlocked: true, isLoading: false});
            } catch (TypeError) {
              this.setState({isBlocked: false, isLoading: false});
            }
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visibleModal: 1,
            errorMessage: 'There was a problem retrieving this users information, please try again.',
          });
        });
  };

  unblockUser = async () => {
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.userID}/block`, {
      method: 'DELETE',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => {
          if (response.status === 200) {
            console.log('200: OK');
            this.props.navigation.goBack();
          } else if (response.status === 404) {
            console.log('404: User not found');
            this.setState({
              visibleModal: 1,
              errorMessage: 'User was not found, try again',
            });
          } else {
            console.log('Something went wrong!');
            this.setState({
              visibleModal: 1,
              errorMessage: 'There was a problem processing your request, please try again',
            });
          }
        });
  };

  blockUser = async () => {
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.userID}/block`, {
      method: 'POST',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => {
          if (response.status === 200) {
            console.log('200: OK');
            this.props.navigation.goBack();
          } else if (response.status === 404) {
            console.log('404: User not found');
            this.setState({
              visibleModal: 1,
              errorMessage: 'User was not found, try again',
            });
          } else {
            console.log('Something went wrong!');
            this.setState({
              visibleModal: 1,
              errorMessage: 'There was a problem processing your request, please try again',
            });
          }
        });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.onFocus);
  }

  onFocus = () => {
    this.isContact();
    this.isBlocked();
  };

  render() {
    if (this.state.isLoading === true) {
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
    } else if (this.state.isBlocked === true) {
      return (
        <View>
          <ContactUserDetails
            firstName={this.props.route.params.firstName}
            lastName={this.props.route.params.lastName}
            email={this.props.route.params.email}
          />

          <View style={userStyles.txtContainer}>
            <Text style={userStyles.titleText}>Actions</Text>
          </View>
          <View style={userStyles.buttonContainer}>
            <Pressable
              style={[userStyles.addButton, userStyles.elements]}
              onPress={() => {
                this.unblockUser();
              }}>
              <Text style={userStyles.buttonText}>Unblock User</Text>
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
    } else if (this.state.isContact === true) {
      return (
        <View>
          <ContactUserDetails
            firstName={this.props.route.params.firstName}
            lastName={this.props.route.params.lastName}
            email={this.props.route.params.email}
          />

          <View style={userStyles.txtContainer}>
            <Text style={userStyles.titleText}>Actions</Text>
          </View>
          <View style={userStyles.buttonContainer}>
            <Pressable
              style={[userStyles.removeButton, userStyles.elements]}
              onPress={() => {
                this.removeContact();
              }}>
              <Text style={userStyles.buttonText}>Remove Contact</Text>
            </Pressable>
          </View>
          <View style={userStyles.buttonContainer}>
            <Pressable
              style={[userStyles.removeButton, userStyles.elements]}
              onPress={() => {
                this.blockUser();
              }}>
              <Text style={userStyles.buttonText}>Block User</Text>
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
    } else if (this.state.isContact === false) {
      return (
        <View>
          <ContactUserDetails
            firstName={this.props.route.params.firstName}
            lastName={this.props.route.params.lastName}
            email={this.props.route.params.email}
          />

          <View style={userStyles.txtContainer}>
            <Text style={userStyles.titleText}>Actions</Text>
          </View>
          <View style={userStyles.buttonContainer}>
            <Pressable
              style={[userStyles.addButton, userStyles.elements]}
              onPress={() => {
                this.addContact();
              }}>
              <Text style={userStyles.buttonText}>Add Contact</Text>
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
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#54ADFF',
    borderRadius: 10,
    width: '40%',
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
