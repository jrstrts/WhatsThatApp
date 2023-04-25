/* eslint-disable max-len */
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import Message from './components/elements/message.js';
import User from './components/elements/user.js';

export default function App() {
  return (
    <View style={styles.container} >
      <ScrollView>
        <User contactName='Contact 1' msgText='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadssssssssdfffff' />
      </ScrollView>
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
