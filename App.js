/* eslint-disable max-len */
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import MessageThread from './components/fragments/message-thread';
import Chats from './components/fragments/chat';
import Login from './components/fragments/login';

export default function App() {
  return (
    <View style={styles.container} >
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingTop: 45,
  },
});
