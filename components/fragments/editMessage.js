import {View, Pressable, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import globalStyles from '../styles/globalStyles';

class ChangeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      originalMessageInfo: [],
      message: '',
      chatInfo: [],
      visibleModal: null,
      errorMessage: '',
    };
  }

  static propTypes = {
    navigation: PropTypes.any,
    route: PropTypes.any,
  };

  handleMessageInput = (message) => {
    this.setState({message: message});
  };

  getChat = async () => {
    return fetch(`http://localhost:3333/api/1.0.0/chat/${this.props.route.params.chatID}`, {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({chatInfo: responseJson});
          for (let i = 0; i < Object.keys(responseJson.messages).length; i++) {
            if (responseJson.messages[i].message_id ==
              this.props.route.params.messageID) {
              this.setState({
                originalMessageInfo: responseJson.messages[i],
                isLoading: false,
                message: responseJson.messages[i].message,
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visibleModal: 1,
            errorMessage: 'Failed to get this messages information, please try again.',
          });
        });
  };

  editMessage = async () => {
    let dataToSend = {};

    if (this.state.message !== this.state.originalMessageInfo['message'] &&
        this.state.message !== '') {
      dataToSend['message'] = this.state.message;
    } else {
      console.log('thats the same, or a blank message');
      this.setState({
        visibleModal: 1,
        errorMessage: 'Your new message is the same as the old one, or blank! Please try again.',
      });
    }

    dataToSend = JSON.stringify(dataToSend);
    if (dataToSend !== '{}') {
      return fetch('http://localhost:3333/api/1.0.0/chat/' +
                    this.props.route.params.chatID +
                    '/message/' +
                    this.props.route.params.messageID, {
        method: 'PATCH',
        headers: {
          'X-Authorization': await AsyncStorage.getItem('session_token'),
          'content-type': 'application/json',
        },
        body: dataToSend,
      })
          .then((response) => {
            if (response.status === 200) {
              console.log('Update success!');
              this.props.navigation.goBack();
            } else if (response.status === 400) {
              console.log('400: Bad Request (bad data)');
              this.setState({
                visibleModal: 1,
                errorMessage: 'Your message text is invalid, try again.',
              });
            } else {
              console.log('Something has gone wrong!');
              this.setState({
                visibleModal: 1,
                errorMessage: 'There was a problem dealing with your request, please try again',
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };

  removeMessage = async () => {
    return fetch('http://localhost:3333/api/1.0.0/chat/' +
                  this.props.route.params.chatID +
                  '/message/' +
                  this.props.route.params.messageID, {
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
            console.log('404: Message not found');
            this.setState({
              visibleModal: 1,
              errorMessage: 'Message not found, try again',
            });
          } else {
            console.log('Something went wrong!');
            this.setState({
              visibleModal: 1,
              errorMessage: 'There was a problem dealing with your request, please try again',
            });
          }
        });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.onFocus);
  };

  onFocus = () => {
    this.setState({isLoading: true});
    this.getChat();
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
          <View style={ChangeDetailsStyles.txtContainer}>
            <Text style={ChangeDetailsStyles.titleText}>Edit Message</Text>
            <Text>Only change the fields you wish to edit</Text>
          </View>
          <View style={ChangeDetailsStyles.inputContainer}>
            <TextInput
              style={[ChangeDetailsStyles.inputs, ChangeDetailsStyles.elements]}
              placeholderTextColor={'grey'}
              inputMode='text'
              placeholder='Message'
              onChangeText={this.handleMessageInput}
              value={this.state.message}
            />
          </View>
          <View style={ChangeDetailsStyles.buttonContainer}>
            <Pressable
              style={[ChangeDetailsStyles.submitButton,
                ChangeDetailsStyles.elements]}
              onPress={() => {
                this.editMessage();
              }}>
              <Text style={ChangeDetailsStyles.buttonText}>Submit</Text>
            </Pressable>
          </View>
          <View style={ChangeDetailsStyles.txtContainer}>
            <Text style={ChangeDetailsStyles.titleText}>Delete Message</Text>
          </View>
          <View style={ChangeDetailsStyles.buttonContainer}>
            <Pressable
              style={[ChangeDetailsStyles.deleteButton,
                ChangeDetailsStyles.elements]}
              onPress={() => {
                this.removeMessage();
              }}>
              <Text style={ChangeDetailsStyles.buttonText}>Delete</Text>
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

const ChangeDetailsStyles = StyleSheet.create({
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
  deleteButton: {
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

export default ChangeDetails;
