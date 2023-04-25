/* eslint-disable max-len */

import {ScrollView} from 'react-native';
import React, {Component} from 'react';
import {StatusBar} from 'expo-status-bar';
import Message from '../elements/message';

class MessageThread extends Component {
  render() {
    return (
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
    );
  }
}

export default MessageThread;
