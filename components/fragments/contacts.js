import {ScrollView, FlatList, View, Text} from 'react-native';
import React, {Component} from 'react';
import User from '../elements/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    this.getContacts();
  }

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
              <User
                contactName={`${item.first_name} ${item.last_name}`}
              />
            )}
          />
        </ScrollView>
      );
    }
  }
}

export default Contacts;
