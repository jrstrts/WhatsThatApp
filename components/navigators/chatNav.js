// import {StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PropTypes from 'prop-types';

import Chats from '../fragments/chat';
import MessageThread from '../fragments/message-thread';
import AddChat from '../fragments/addChat';
import ChatInfo from '../fragments/chatInfo';
import EditChatInfo from '../fragments/editChatInfo';
import AddUserChat from '../fragments/addUserChat';
import RemoveUserChat from '../fragments/removeUserChat';

const Stack = createNativeStackNavigator();

class ChatNav extends Component {
  static propTypes = {
    navigation: PropTypes.any,
  };

  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen
          name="ChatScreen"
          component={MessageThread}
          options={{headerShown: true}} />
        <Stack.Screen
          name='AddChat'
          component={AddChat}
          options={{headerShown: true}} />
        <Stack.Screen
          name='ChatInfo'
          component={ChatInfo}
          options={{headerShown: true}} />
        <Stack.Screen
          name='EditChatInfo'
          component={EditChatInfo}
          options={{headerShown: true}} />
        <Stack.Screen
          name='AddUserChat'
          component={AddUserChat}
          options={{headerShown: true}} />
        <Stack.Screen
          name='RemoveUserChat'
          component={RemoveUserChat}
          options={{headerShown: true}} />
      </Stack.Navigator>
    );
  }
}

export default ChatNav;
