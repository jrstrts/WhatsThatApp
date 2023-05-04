import {ScrollView, FlatList, View, Text, Pressable} from 'react-native';
import React, {Component} from 'react';
import User from '../elements/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isProcessing: false,
      firstName: '',
      lastName: '',
      contactData: [],
    };
  }

  static propTypes = {
    navigation: PropTypes.any,
  };

  getContacts = async () => {
    return fetch('http://localhost:3333/api/1.0.0/contacts', {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            contactData: responseJson,
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
    this.getContacts();
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
        <ScrollView>
          <FlatList
            data={this.state.contactData}
            renderItem={({item}) => (
              <Pressable onPress={() =>
                this.props.navigation.navigate('ContactUser', {
                  userID: item.user_id,
                  firstName: item.first_name,
                  lastName: item.last_name,
                  email: item.email,
                })}
              >
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
}

export default Contacts;
