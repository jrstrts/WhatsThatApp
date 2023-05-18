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
import Modal from 'react-native-modal';
import globalStyles from '../styles/globalStyles';

import User from '../elements/user';

class RemoveUserChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      chatData: [],
      visibleModal: null,
      errorMessage: '',
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
          this.setState({
            visibleModal: 1,
            errorMessage: 'Failed to get chat members, please try again',
          });
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
          } else if (response.status === 404) {
            console.log('404: Not Found (chat does not exist)');
            this.setState({
              visibleModal: 1,
              errorMessage: 'Chat does not exist, please try again',
            });
          } else {
            console.log('401 or 500: Something has gone wrong!');
            this.setState({
              visibleModal: 1,
              errorMessage: 'There was an error processing your request, please try again',
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visibleModal: 1,
            errorMessage: 'There was an error processing your request, please try again',
          });
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
        <Modal isVisible={this.state.visibleModal === 1}
          style={globalStyles.bottomModal}>
          <View style={globalStyles.modalContent}>
            <Text>{this.state.errorMessage}</Text>
            <Pressable onPress={() => this.setState({visibleModal: null})}>
              <View style={globalStyles.modalButton}>
                <Text>Close</Text>
              </View>
            </Pressable>
          </View>
        </Modal>
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
