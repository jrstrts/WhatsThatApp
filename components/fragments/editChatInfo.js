import {View, Pressable, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import globalStyles from '../styles/globalStyles';

class ChangeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatName: '',
      visibleModal: null,
      errorMessage: '',
    };
  }

  static propTypes = {
    navigation: PropTypes.any,
    route: PropTypes.any,
  };

  handleChatNameInput = (chatName) => {
    this.setState({chatName: chatName});
  };

  sendUpdate = async () => {
    return fetch(`http://localhost:3333/api/1.0.0/chat/${this.props.route.params.chatID}`, {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('session_token'),
      },
    })
        .then((response) => response.json())
        .then(async (responseJson) => {
          let dataToSend = {};

          if (this.state.chatName !== responseJson['name'] &&
              this.state.chatName !== '') {
            dataToSend['name'] = this.state.chatName;
          }

          dataToSend = JSON.stringify(dataToSend);
          if (dataToSend !== '{}') {
            return fetch(`http://localhost:3333/api/1.0.0/chat/${this.props.route.params.chatID}`, {
              method: 'PATCH',
              headers: {
                'X-Authorization': await AsyncStorage.getItem('session_token'),
                'content-type': 'application/json',
              },
              body: dataToSend,
            })
                .then((response) => {
                  if (response.status === 200) {
                    console.log('Update success!');
                    this.props.navigation.goBack();
                  } else if (response.status === 400) {
                    console.log('400: Bad Request (bad data)');
                    this.setState({
                      visibleModal: 1,
                      errorMessage: 'Name is invalid, please try again',
                    });
                  } else {
                    this.setState({
                      visibleModal: 1,
                      errorMessage: 'There was a problem, please try again',
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                  this.setState({
                    visibleModal: 1,
                    errorMessage: 'There was a problem, please try again',
                  });
                });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visibleModal: 1,
            errorMessage: 'There was a problem, please try again',
          });
        });
  };

  render() {
    return (
      <View>
        <View style={ChangeDetailsStyles.txtContainer}>
          <Text style={ChangeDetailsStyles.titleText}>Change Details</Text>
        </View>
        <View style={ChangeDetailsStyles.inputContainer}>
          <TextInput
            style={[ChangeDetailsStyles.inputs, ChangeDetailsStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='text'
            placeholder='Chat Name'
            onChangeText={this.handleChatNameInput}
            value={this.state.firstName}
          />
        </View>
        <View style={ChangeDetailsStyles.buttonContainer}>
          <Pressable
            style={[ChangeDetailsStyles.submitButton,
              ChangeDetailsStyles.elements]}
            onPress={() => {
              this.sendUpdate();
            }}>
            <Text style={ChangeDetailsStyles.buttonText}>Submit</Text>
          </Pressable>
        </View>
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
      </View>
    );
  }
}

const ChangeDetailsStyles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '10%',
    padding: 15,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
  },
  txtContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
    padding: 15,
  },
  inputs: {
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: 50,
    backgroundColor: 'lightgrey',
    borderColor: '#fff',
  },
  elements: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default ChangeDetails;
