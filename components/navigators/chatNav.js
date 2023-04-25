// import {StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chats from '../fragments/chat';
import MessageThread from '../fragments/message-thread';

const Stack = createNativeStackNavigator();

class ChatNav extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen
          name="ChatScreen"
          component={MessageThread}
          options={{headerShown: true}}/>
      </Stack.Navigator>
    );
  }
}

export default ChatNav;

{/* <Tab.Screen name="Messages" component={MessageThread} />
<Tab.Screen name="Contacts" component={Contacts} /> */}
