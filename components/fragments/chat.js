/* eslint-disable max-len */

import {ScrollView, Pressable, View, FlatList, Text} from 'react-native';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import User from '../elements/user';

import Modal from 'react-native-modal';
import globalStyles from '../styles/globalStyles';

class Chats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isProcessing: false,
      firstName: '',
      lastName: '',
      lastMessage: '',
      chatData: [],
      myUserID: null,
    };
  };

  static propTypes = {
    navigation: PropTypes.any,
  };

  getChats = async () => {
    return fetch('http://localhost:3333/api/1.0.0/chat', {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            chatData: responseJson,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visibleModal: 1,
            errorMessage: 'There was an error loading chats, try again',
          });
        });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.onFocus);
  }

  onFocus = async () => {
    await AsyncStorage.getItem('user_id')
        .then((myUserID) => {
          this.setState({myUserID: myUserID});
        });
    this.setState({isLoading: true});
    this.getChats();
  };

  /**
  * function determine the chat preview message to be displayed
  * @param {object} lastMessage - JSON object 'last_message' from API response
  * @return {string} - The string to be displayed as preview text for a chat,
  * either:
  * * the last message, if another person sent it
  * * the last message with "You: " appended to the start if you sent it
  * * empty string if no messages have ever been sent
  */
  getMessageText(lastMessage) {
    let messageText;
    if (Object.keys(lastMessage).length !== 0) {
      lastMessage.author.user_id == this.state.myUserID ?
      messageText = `You: ${lastMessage.message}` :
      messageText = `${lastMessage.message}`;
    } else {
      messageText = '';
    }
    return messageText;
  }

  render() {
    const navigation = this.props.navigation;

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
        <ScrollView>
          <FlatList
            data={this.state.chatData}
            renderItem={({item}) => (
              <Pressable onPress={() => navigation.navigate('ChatScreen', {
                chatID: item.chat_id,
              })}>
                <User
                  contactName={`${item.name}`}
                  msgText={this.getMessageText(
                      item.last_message)}
                />
              </Pressable>
            )}
          />
        </ScrollView>
      );
    }
  }
}

export default Chats;
