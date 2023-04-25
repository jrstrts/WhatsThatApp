import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.type == 'incoming') {
      return (
        <View style={messageStyles.incomingMsgContainer} >
          <View style={[
            messageStyles.messageBackground,
            messageStyles.incomingMessageBackground,
          ]} >
            <Text style={messageStyles.messageText} >{this.props.text}</Text>
          </View>
        </View>
      );
    } else if (this.props.type == 'outgoing') {
      return (
        <View style={messageStyles.outgoingMsgContainer} >
          <View style={[
            messageStyles.messageBackground,
            messageStyles.outgoingMessageBackground,
          ]} >
            <Text style={messageStyles.messageText} >{this.props.text}</Text>
          </View>
        </View>
      );
    }
  }
}

const messageStyles = StyleSheet.create({
  outgoingMsgContainer: {
    alignItems: 'flex-end',
  },
  incomingMsgContainer: {
    alignItems: 'flex-start',
  },
  messageBackground: {
    maxWidth: '80%',
    margin: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
  },
  incomingMessageBackground: {
    backgroundColor: '#303030',
    marginLeft: 10,
  },
  outgoingMessageBackground: {
    backgroundColor: 'green',
    marginRight: 10,
  },
  messageText: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
});

export default Message;
