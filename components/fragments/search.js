import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import React, {Component} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

import User from '../elements/user';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchEntry: '',
      isLoading: false,
      hasSearched: false,
      searchData: [],
      pageNo: 1,
    };
  }

  static propTypes = {
    navigation: PropTypes.any,
  };

  handleSearchEntryInput = (searchEntry) => {
    this.setState({searchEntry: searchEntry});
  };

  getSearchResults = async () => {
    this.setState({
      isLoading: true,
      searchData: [],
    });

    return fetch('http://localhost:3333/api/1.0.0/search/?q=' +
                  this.state.searchEntry +
                  '&?search_in=all&limit=5&offset=' +
                  (this.state.pageNo-1)*5, {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            hasSearched: true,
            searchData: responseJson,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  };

  handlePageIncrement() {
    if (this.state.pageNo >= 1) {
      this.setState({pageNo: this.state.pageNo + 1}, () => {
        this.getSearchResults();
      });
    }
  };

  handlePageDecrement() {
    if (this.state.pageNo > 1) {
      this.setState({pageNo: this.state.pageNo - 1}, () => {
        this.getSearchResults();
      });
    }
  };

  render() {
    if (!this.state.hasSearched || this.state.isLoading) {
      return (
        <View>
          <View style={SearchStyles.txtContainer}>
            <Text style={SearchStyles.titleText}>Search</Text>
            <Text>Search for a user to add to your contacts</Text>
          </View>
          <View style={SearchStyles.inputContainer}>
            <TextInput
              style={[SearchStyles.inputs, SearchStyles.elements]}
              placeholderTextColor={'grey'}
              inputMode='text'
              placeholder='Search'
              onChangeText={this.handleSearchEntryInput}
              value={this.state.searchEntry}
            />
            <Pressable
              style={SearchStyles.searchButton}
              onPress={() => this.getSearchResults()}
            >
              <Ionicons name='search-outline' size={32} />
            </Pressable>
          </View>

          <View style={SearchStyles.separator}/>
        </View>
      );
    } else {
      return (
        <View>
          <View style={SearchStyles.txtContainer}>
            <Text style={SearchStyles.titleText}>Search</Text>
            <Text>Search for a user to add or remove from your contacts</Text>
          </View>
          <View style={SearchStyles.inputContainer}>
            <TextInput
              style={[SearchStyles.inputs, SearchStyles.elements]}
              placeholderTextColor={'grey'}
              inputMode='text'
              placeholder='Search'
              onChangeText={this.handleSearchEntryInput}
              value={this.state.searchEntry}
            />
            <Pressable
              style={SearchStyles.searchButton}
              onPress={() => this.getSearchResults()}
            >
              <Ionicons name='search-outline' size={32} />
            </Pressable>
          </View>

          <View style={SearchStyles.separator}/>

          <FlatList
            data={this.state.searchData}
            renderItem={({item}) => (
              <Pressable onPress={() =>
                this.props.navigation.navigate('ContactUser', {
                  userID: item.user_id,
                  firstName: item.given_name,
                  lastName: item.family_name,
                  email: item.email,
                })}>
                <User
                  contactName={`${item.given_name} ${item.family_name}`}
                />
              </Pressable>
            )}
          />

          <View style={SearchStyles.pageButtonContainer}>
            <Pressable
              style={SearchStyles.navArrowButtons}
              onPress={() => this.handlePageDecrement()}>
              <Ionicons name='caret-back' size={32} />
            </Pressable>
            <Text>{this.state.pageNo}</Text>
            <Pressable
              style={SearchStyles.navArrowButtons}
              onPress={() =>this.handlePageIncrement()}>
              <Ionicons name='caret-forward' size={32} />
            </Pressable>
          </View>
        </View>
      );
    }
  }
}

const SearchStyles = StyleSheet.create({
  txtContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
    padding: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '10%',
  },
  pageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    padding: 20,
  },
  inputs: {
    borderWidth: 1,
    borderRadius: 10,
    width: '70%',
    height: 50,
    backgroundColor: 'lightgrey',
    borderColor: '#fff',
    marginRight: 10,
  },
  elements: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  searchButton: {
    backgroundColor: '#BABABA',
    borderRadius: 10,
    width: '20%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navArrowButtons: {
    width: '20%',
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
});

export default Search;
