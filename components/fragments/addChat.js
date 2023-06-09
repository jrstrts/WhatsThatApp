import {View, Pressable, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import globalStyles from '../styles/globalStyles';

class AddChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatName: '',
      visibleModal: null,
      errorMessage: '',
    };
  }

  static propTypes = {
    navigation: PropTypes.any,
  };

  handleChatNameInput = (chatName) => {
    this.setState({chatName: chatName});
  };

  createChat = async () => {
    const sendData = {
      name: this.state.chatName,
    };
    return fetch('http://localhost:3333/api/1.0.0/chat', {
      method: 'post',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    })
        .then((response) => {
          if (response.status === 201) {
            this.setState({ // TODO: Success notification here
              chatName: '',
            });
            this.props.navigation.goBack();
          } else if (response.status === 400) {
            this.setState({
              visibleModal: 1,
              errorMessage: 'Check the name of your chat and try again',
            });
          } else {
            this.setState({
              visibleModal: 1,
              errorMessage: 'There was a problem with your request, please try again',
            });
          }
        })
        .catch(() => {
          this.setState({
            visibleModal: 1,
            errorMessage: 'There was a problem with your request, please try again',
          });
        });
  };

  render() {
    return (
      <View>
        <View style={AddChatStyles.txtContainer}>
          <Text style={AddChatStyles.titleText}>Add Chat</Text>
          <Text>Input the name of the chat below</Text>
        </View>
        <View style={AddChatStyles.inputContainer}>
          <TextInput
            style={[AddChatStyles.inputs, AddChatStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='text'
            placeholder='Chat Name'
            onChangeText={this.handleChatNameInput}
            value={this.state.chatName}
          />
        </View>
        <View style={AddChatStyles.buttonContainer}>
          <Pressable
            style={[AddChatStyles.submitButton,
              AddChatStyles.elements]}
            onPress={() => {
              this.createChat();
            }}>
            <Text style={AddChatStyles.buttonText}>Submit</Text>
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

const AddChatStyles = StyleSheet.create({
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

export default AddChat;
