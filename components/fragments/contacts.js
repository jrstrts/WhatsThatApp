/* eslint-disable max-len */

import {ScrollView} from 'react-native';
import React, {Component} from 'react';
import User from '../elements/user';

class Contacts extends Component {
  render() {
    return (
      <ScrollView>
        <User contactName='Contact 1' />
        <User contactName='Contact 2' />
        <User contactName='Contact 3' />
        <User contactName='Contact 4' />
        <User contactName='Contact 5' />
        <User contactName='Contact 6' />
        <User contactName='Contact 7' />
        <User contactName='Contact 8' />
      </ScrollView>
    );
  }
}

export default Contacts;
