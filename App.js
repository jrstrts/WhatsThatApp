/* eslint-disable max-len */
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import Message from './components/message.js';

export default function App() {
  return (
    <View style={styles.container} >
      <ScrollView>
        <Message type='outgoing' text='Something else completely entriely which is far too long for one line'/>
        <Message type='incoming' text='Lorem ipsum dolor sit amet' />
        <Message type='outgoing' text='Something else completely entriely which is far too long for one line'/>
        <Message type='incoming' text='Lorem ipsum dolor sit amet' />
        <Message type='outgoing' text='Something else completely entriely which is far too long for one line'/>
        <Message type='incoming' text='Lorem ipsum dolor sit amet' />
        <Message type='outgoing' text='Something else completely entriely which is far too long for one line'/>
        <Message type='incoming' text='Lorem ipsum dolor sit amet' />
        <Message type='outgoing' text='Something else completely entriely which is far too long for one line'/>
        <Message type='incoming' text='Lorem ipsum dolor sit amet' />
        <Message type='outgoing' text='Something else completely entriely which is far too long for one line'/>
        <Message type='incoming' text='Lorem ipsum dolor sit amet' />
        <Message type='outgoing' text='Something else completely entriely which is far too long for one line'/>
        <Message type='incoming' text='Lorem ipsum dolor sit amet' />
        <Message type='outgoing' text='Something else completely entriely which is far too long for one line'/>
        <Message type='incoming' text='Lorem ipsum dolor sit amet' />
        <Message type='incoming' text='Something else completely entriely which is far too long for one line'/>
        <Message type='incoming' text='Lorem ipsum dolor sit amet' />
        <StatusBar style='auto' />
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
