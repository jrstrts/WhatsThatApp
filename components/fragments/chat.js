/* eslint-disable max-len */

import {ScrollView, Pressable, View, FlatList, Text} from 'react-native';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import User from '../elements/user';

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

  render() {
    const navigation = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
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
                  msgText={item.last_message.author.user_id == this.state.myUserID ?
                    `You: ${item.last_message.message}` :
                    `${item.last_message.message}`}
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
