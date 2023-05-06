// import {StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {Pressable} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from 'prop-types';

import Chats from '../fragments/chat';
import MessageThread from '../fragments/message-thread';
import AddChat from '../fragments/addChat';

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
          options={{headerShown: true,
            headerRight: () => (
              <Pressable
                onPress={console.log('info')}
                style={{paddingRight: 20}}
              >
                <Ionicons name='information-circle-outline' size={32} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name='AddChat'
          component={AddChat}
          options={{headerShown: true}} />
      </Stack.Navigator>
    );
  }
}

export default ChatNav;
