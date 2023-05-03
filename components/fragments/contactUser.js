import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ContactUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      contactData: [],
      isContact: false,
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
          } else if (response.status === 401) {
            console.log('401: Not Logged in');
          } else if (response.status === 404) {
            console.log('404: User not found');
          } else {
            console.log('Something went wrong!');
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
              console.log('user is a contact');
              this.setState({isContact: true, isLoading: false});
            } catch (TypeError) {
              console.log('User is not a contact');
              this.setState({isContact: false, isLoading: false});
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.onFocus);
  }

  onFocus = () => {
    this.isContact();
    console.log(this.state.isContact);
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else if (this.state.isContact === true) {
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
        </View>
      );
    } else if (this.state.isContact === false) {
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
          <View style={userStyles.buttonContainer}>
            <Pressable
              style={[userStyles.removeButton, userStyles.elements]}
              onPress={() => {
                console.log('Block');
              }}>
              <Text style={userStyles.buttonText}>Block User</Text>
            </Pressable>
          </View>
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
