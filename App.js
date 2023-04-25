/* eslint-disable max-len */
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import MessageThread from './components/fragments/message-thread';

export default function App() {
  return (
    <View style={styles.container} >
      <MessageThread />
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
