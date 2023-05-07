import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

import User from '../elements/user';

class RemoveUserChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      chatData: [],
    };
  }

  static propTypes = {
    navigation: PropTypes.any,
    route: PropTypes.any,
  };

  handleSearchEntryInput = (searchEntry) => {
    this.setState({searchEntry: searchEntry});
  };

  getChatMembers = async () => {
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

  removeUserFromChat = async (userID) => {
    return fetch(`http://localhost:3333/api/1.0.0/chat/${this.props.route.params.chatID}/user/${userID}`, {
      method: 'DELETE',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => {
          if (response.status === 200) {
            console.log('Update success!');
            this.props.navigation.goBack();
          } else if (response.status === 400) {
            console.log('400: Bad Request (bad data)');
          } else if (response.status === 403) {
            console.log('403: Forbidden (editing wrong chat?)');
          } else if (response.status === 404) {
            console.log('404: Not Found (chat does not exist)');
          } else if (response.status === 401 ||
                    response.status === 500) {
            console.log('401 or 500: Something has gone wrong!');
          }
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
    this.getChatMembers();
  };

  render() {
    return (
      <ScrollView>
        <View style={SearchStyles.txtContainer}>
          <Text style={SearchStyles.titleText}>Remove User</Text>
          <Text>Tap the user you wish to remove</Text>
        </View>

        <View style={SearchStyles.separator}/>

        <FlatList
          data={this.state.chatData.members}
          renderItem={({item}) => (
            <Pressable onPress={() => this.removeUserFromChat(item.user_id)}>
              <User
                contactName={`${item.first_name} ${item.last_name}`}
              />
            </Pressable>
          )}
        />
      </ScrollView>
    );
  }
}

const SearchStyles = StyleSheet.create({
  txtContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
    padding: 15,
  },
  separator: {
    padding: 20,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default RemoveUserChat;
