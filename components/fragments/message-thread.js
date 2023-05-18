/* eslint-disable max-len */

import {ScrollView, FlatList, View, Text, Pressable} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import Message from '../elements/message';
import MessageInput from '../elements/messageInput';
import globalStyles from '../styles/globalStyles';

class MessageThread extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isProcessing: false,
      firstName: '',
      lastName: '',
      chatInfo: [],
      chatMessages: [],
      myUserID: null,
      visibleModal: null,
      errorMessage: '',
    };
  }

  static propTypes = {
    navigation: PropTypes.any,
    route: PropTypes.any,
  };

  getChat = async () => {
    return fetch(`http://localhost:3333/api/1.0.0/chat/${this.props.route.params.chatID}`, {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            chatInfo: responseJson,
            chatMessages: responseJson.messages,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visibleModal: 1,
            errorMessage: 'There was an error retrieving messages, please try again',
          });
        });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.onFocus);
    this.interval = setInterval(() => this.getChat(), 5000);
  }

  onFocus = async () => {
    await AsyncStorage.getItem('user_id')
        .then((myUserID) => {
          this.setState({myUserID: myUserID});
        });
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
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <FlatList
              data={this.state.chatMessages}
              inverted={true}
              renderItem={({item}) => (
                <Message
                  type={item.author.user_id == this.state.myUserID ? 'outgoing' : 'incoming'}
                  text={item.message}
                  senderName={`${item.author.first_name} ${item.author.last_name}`}
                  unixTime={item.timestamp}
                  chatID={this.props.route.params.chatID}
                  messageID={item.message_id}
                  navigation={this.props.navigation}
                />
              )}
            />
          </ScrollView>
          <View>
            <MessageInput chatID={this.props.route.params.chatID} navigation={this.props.navigation}/>
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

export default MessageThread;
