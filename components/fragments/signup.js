import PasswordValidator from 'password-validator';
import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
} from 'react-native';
// const passwordValidator = require('password-validator');
const validator = require('email-validator');

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      statusText: '',
      statusColor: 'black',
    };
  }

  handleFirstNameInput = (firstName) => {
    if (this.state.statusText != '') {
      this.setState({statusText: ''});
    }
    this.setState({firstName: firstName});
  };

  handleLastNamelInput = (lastName) => {
    if (this.state.statusText != '') {
      this.setState({statusText: ''});
    }
    this.setState({lastName: lastName});
  };

  handleEmailInput = (email) => {
    if (this.state.statusText != '') {
      this.setState({statusText: ''});
    }
    this.setState({email: email});
  };

  handlePasswordInput = (password) => {
    if (this.state.statusText != '') {
      this.setState({statusText: ''});
    }
    this.setState({password: password});
  };

  login = () => {
    if (this.state.isProcessing == true) {
      console.log('Already processing request!');
    } else {
      this.setState({isProcessing: true});
      const pwSchema = new PasswordValidator();
      pwSchema
          .is().min(8)
          .has().uppercase()
          .has().lowercase()
          .has().digits(1)
          .has().symbols(1);

      if (validator.validate(this.state.email) &&
      pwSchema.validate(this.state.password)) {
        const sendData = {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
        };

        return fetch('http://localhost:3333/api/1.0.0/user', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
            .then((response) => {
              if (response.status === 201) {
                console.log('Email: ' + this.state.email);
                console.log('Password: ' + this.state.password);
                this.setState({ // TODO: Success notification here
                  isProcessing: false,
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  statusText: '',
                  statusColor: 'black',
                });
                navigation.navigate('Login');
              } else if (response.status === 400 || response.status === 500) {
                // TODO: better error messages with toasts
                console.log('Something has gone wrong!');
                this.setState({
                  isProcessing: false,
                  statusText: 'There was a problem dealing with your request.',
                  statusColor: 'red',
                });
              }
            });
      } else {
        console.log('Email OR password is not valid');
        this.setState({
          isProcessing: false,
          statusText: 'Email OR password is not valid',
          statusColor: 'red',
        });
      }
    }
  };

  render() {
    return (
      <View>
        <View style={signupStyles.txtContainer}>
          <StatusBar hidden />
          <Text style={signupStyles.titleText}>Sign up</Text>
        </View>

        <View style={signupStyles.inputContainer}>
          <TextInput
            style={[signupStyles.inputs, signupStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='text'
            placeholder='First Name'
            onChangeText={this.handleFirstNameInput}
            value={this.state.firstName}
          />
          <TextInput
            style={[signupStyles.inputs, signupStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='text'
            placeholder='Last Name'
            onChangeText={this.handleLastNamelInput}
            value={this.state.lastName}
          />
          <TextInput
            style={[signupStyles.inputs, signupStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='email'
            placeholder='Email'
            onChangeText={this.handleEmailInput}
            value={this.state.email}
          />
          <TextInput
            style={[signupStyles.inputs, signupStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='text'
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={this.handlePasswordInput}
            value={this.state.password}
          />
        </View>

        <View style={signupStyles.buttonContainer}>
          <Pressable
            style={[signupStyles.button]}
            onPress={() => this.login()} >
            <Text style={signupStyles.buttonText}>Sign up</Text>
          </Pressable>
          <Text
            style={[
              {color: this.state.statusColor},
              signupStyles.elements,
              signupStyles.statusText]}>
            {this.state.statusText}
          </Text>
        </View>
      </View>
    );
  }
}

const signupStyles = StyleSheet.create({
  txtContainer: {
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
    padding: 15,
    // margin: 'auto',
    // width: '90%',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: '10%',
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
  button: {
    backgroundColor: '#54ADFF',
    borderRadius: 10,
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elements: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  statusText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'black',
  },
});

export default Signup;
