import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    senderName: PropTypes.string,
    unixTime: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      statusText: '',
      statusColor: 'black',
    };
  }

  unixToDatetime = (unixTime) => {
    const date = new Date(unixTime);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const year = date.getFullYear();

    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${time}`;
  };

  render() {
    if (this.props.type == 'incoming') {
      return (
        <View style={messageStyles.incomingMsgContainer} >
          <View style={[
            messageStyles.messageBackground,
            messageStyles.incomingMessageBackground,
          ]} >
            <Text style={messageStyles.nameText}>{this.props.senderName}</Text>
            <Text style={messageStyles.messageText} >{this.props.text}</Text>
            <Text style={[messageStyles.dateText, {color: 'grey'}]}>
              {this.unixToDatetime(this.props.unixTime)}
            </Text>
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
            <Text style={[messageStyles.dateText, {color: 'lightgrey'}]}>
              {this.unixToDatetime(this.props.unixTime)}
            </Text>
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
  nameText: {
    color: 'white',
    paddingRight: 10,
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateText: {
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 10,
    fontWeight: 'normal',
  },
});

export default Message;
