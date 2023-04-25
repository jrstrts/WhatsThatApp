/* eslint-disable max-len */
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import MessageThread from './components/fragments/message-thread';
import Chats from './components/fragments/chat';

export default function App() {
  return (
    <View style={styles.container} >
      <Chats />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    paddingTop: 45,
  },
});
