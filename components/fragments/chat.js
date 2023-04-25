/* eslint-disable max-len */

import {ScrollView} from 'react-native';
import React, {Component} from 'react';
import User from '../elements/user';

class Chats extends Component {
  render() {
    return (
      <ScrollView>
        <User contactName='Contact 1' msgText='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadssssssssdfffff' />
        <User contactName='Contact 2' msgText='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadssssssssdfffff' />
        <User contactName='Contact 3' msgText='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadssssssssdfffff' />
        <User contactName='Contact 4' msgText='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadssssssssdfffff' />
        <User contactName='Contact 5' msgText='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadssssssssdfffff' />
      </ScrollView>
    );
  }
}

export default Chats;
