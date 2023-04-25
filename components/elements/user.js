import React, {Component} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import PropTypes from 'prop-types';

class User extends Component {
  static propTypes = {
    msgText: PropTypes.string,
    contactName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      msgText: '',
    };
  }

  componentDidMount() {
    if (typeof this.props.msgText !== 'undefined') {
      if (this.props.msgText.length > 30) {
        this.setState({msgText: this.props.msgText.substring(0, 30) + ' ...'});
      } else {
        this.setState({msgText: this.props.msgText});
      }
    }
  }

  render() {
    return (
      <Pressable
        style={messageStyles.userContainer}
        onPress={() => navigation.navigate('ChatScreen')}>
        <View style={messageStyles.pictureBackground} />
        <View style={messageStyles.textBackground}>
          <Text style={messageStyles.usernameText}>
            {this.props.contactName}
          </Text>
          <Text style={messageStyles.messageText}>{this.state.msgText}</Text>
        </View>
      </Pressable>
    );
  }
}

const messageStyles = StyleSheet.create({
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: '5%',
  },
  pictureBackground: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: 'lightgrey',
    height: 70,
    margin: '1%',
  },
  textBackground: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    // backgroundColor: 'lightgrey',
    height: 75,
    margin: '1%',
  },
  usernameText: {
    fontWeight: 'bold',
    paddingLeft: '3%',
  },
  messageText: {
    paddingLeft: '3%',
    padding: '2%',
  },
});

export default User;


