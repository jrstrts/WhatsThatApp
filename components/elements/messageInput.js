import {StyleSheet, View, TextInput, Pressable} from 'react-native';
import React, {Component} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MessageInput extends Component {
  static propTypes = {
    chatID: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false,
      message: '',
    };
  }
  handleSearchEntryInput = (message) => {
    this.setState({message: message});
  };

  sendMessage = async () => {
    this.setState({isProcessing: false});
    const sendData = {
      message: this.state.message,
    };
    return fetch(`http://localhost:3333/api/1.0.0/chat/${this.props.chatID}/message`, {
      method: 'POST',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    })
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              isProcessing: false,
              message: '',
            });
            this.textInput.clear();

          // TODO: better error messages with toasts
          } else if (response.status === 400) {
            console.log('400: Bad Request');
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
      <View style={MessageInputStyles.inputContainer}>
        <TextInput
          style={[MessageInputStyles.inputs, MessageInputStyles.elements]}
          placeholderTextColor={'grey'}
          inputMode='text'
          placeholder='Message'
          onChangeText={this.handleSearchEntryInput}
          value={this.state.searchEntry}
          ref={(input) => {
            this.textInput = input;
          }}
        />
        <Pressable
          style={MessageInputStyles.searchButton}
          onPress={() => this.sendMessage()}
        >
          <Ionicons name='send' size={24} />
        </Pressable>
      </View>
    );
  }
}

const MessageInputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '10%',
  },
  inputs: {
    borderWidth: 1,
    borderRadius: 10,
    width: '75%',
    height: 50,
    backgroundColor: 'lightgrey',
    borderColor: '#fff',
    marginRight: 10,
  },
  elements: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  searchButton: {
    backgroundColor: '#BABABA',
    borderRadius: 100,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageInput;
