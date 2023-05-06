import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import User from '../elements/user';

class ChatInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isProcessing: false,
      name: '',
      creator: '',
      chatData: [],
    };
  }

  static propTypes = {
    navigation: PropTypes.any,
    route: PropTypes.any,
  };

  getChatInfo = async () => {
    return fetch(`http://localhost:3333/api/1.0.0/chat/${this.props.route.params.chatID}`, {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            chatData: responseJson,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.onFocus);
  }

  onFocus = () => {
    this.setState({isLoading: true});
    this.getChatInfo();
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View>
          <View style={ChatInfoStyles.txtContainer}>
            <Text style={ChatInfoStyles.titleText}>Details</Text>
            <Text style={ChatInfoStyles.subHeadText}>Chat Name</Text>
            <Text style={ChatInfoStyles.elements}>
              {this.state.chatData.name}
            </Text>
            <Text style={ChatInfoStyles.subHeadText}>Creator</Text>
            <Text style={ChatInfoStyles.elements}>
              {
                this.state.chatData.creator.first_name
              } {
                this.state.chatData.creator.last_name
              }
            </Text>
          </View>
          <View style={ChatInfoStyles.buttonContainer}>
            <Pressable
              style={[ChatInfoStyles.submitButton, ChatInfoStyles.elements]}
              onPress={() => {
                this.props.navigation.navigate('EditChatInfo', {
                  chatID: this.props.route.params.chatID,
                });
              }}>
              <Text style={ChatInfoStyles.buttonText}>Edit</Text>
            </Pressable>
          </View>
          <View style={ChatInfoStyles.txtContainer}>
            <Text style={ChatInfoStyles.titleText}>Members</Text>
          </View>
          <FlatList
            data={this.state.chatData.members}
            renderItem={({item}) => (
              <Pressable onPress={() =>
                this.props.navigation.navigate('ContactUser', {
                  userID: item.user_id,
                  firstName: item.first_name,
                  lastName: item.last_name,
                  email: item.email,
                })}>
                <User
                  contactName={`${item.first_name} ${item.last_name}`}
                />
              </Pressable>
            )}
          />
        </View>
      );
    }
  }
}

const ChatInfoStyles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '10%',
    padding: 15,
  },
  txtContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
    padding: 15,
  },
  elements: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#54ADFF',
    borderRadius: 10,
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subHeadText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ChatInfo;
