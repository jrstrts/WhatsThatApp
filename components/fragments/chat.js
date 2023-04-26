/* eslint-disable max-len */

import {ScrollView, Pressable} from 'react-native';
import React, {Component} from 'react';
import User from '../elements/user';

class Chats extends Component {
  static propTypes = {
    navigation: PropTypes.any,
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView>
        <Pressable onPress={() => navigation.navigate('ChatScreen')}>
          <User contactName='Contact 1' msgText='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadssssssssdfffff' />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ChatScreen')}>
          <User contactName='Contact 2' msgText='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadssssssssdfffff' />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ChatScreen')}>
          <User contactName='Contact 3' msgText='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadssssssssdfffff' />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ChatScreen')}>
          <User contactName='Contact 4' msgText='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadssssssssdfffff' />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ChatScreen')}>
          <User contactName='Contact 5' msgText='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadssssssssdfffff' />
        </Pressable>
      </ScrollView>
    );
  }
}

export default Chats;
