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
// import PropTypes from 'prop-types';

// const passwordValidator = require('password-validator');
const validator = require('email-validator');

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      statusText: '',
      statusColor: 'black',
    };
  }

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
    const pwSchema = new PasswordValidator();
    pwSchema
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits(1)
        .has().symbols(1);

    if (validator.validate(this.state.email) &&
    pwSchema.validate(this.state.password)) {
      console.log('Email: ' + this.state.email);
      console.log('Password: ' + this.state.password);
      this.setState({
        email: '',
        password: '',
        statusText: 'Success!',
        statusColor: 'green',
      });
      return true;
    } else {
      console.log('Email OR password is not valid');
      this.setState({
        statusText: 'Email OR password is not valid',
        statusColor: 'red',
      });
      return false;
    }
  };

  render() {
    return (
      <View>
        <View style={loginStyles.txtContainer}>
          <StatusBar hidden />
          <Text style={loginStyles.titleText}>Log In</Text>
        </View>

        <View style={loginStyles.inputContainer}>
          <TextInput
            style={[loginStyles.inputs, loginStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='email'
            placeholder='Email'
            onChangeText={this.handleEmailInput}
            value={this.state.email}
          />
          <TextInput
            style={[loginStyles.inputs, loginStyles.elements]}
            placeholderTextColor={'grey'}
            inputMode='text'
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={this.handlePasswordInput}
            value={this.state.password}
          />
        </View>

        <View style={loginStyles.buttonContainer}>
          <Pressable
            style={[loginStyles.button]}
            onPress={() => {
              if (this.login()) {
                console.log('go to main screen');
              };
            }}>
            <Text style={loginStyles.buttonText}>Log in</Text>
          </Pressable>
          <Pressable
            onPress={() => console.log('go to sign up')}
          >
            <Text style={[loginStyles.elements, loginStyles.linkText]}>
              Need an account?
            </Text>
          </Pressable>
        </View>

        <View style={[{padding: 0}, loginStyles.txtContainer]}>
          <Text
            style={[
              {color: this.state.statusColor},
              loginStyles.elements,
              loginStyles.statusText]}>
            {this.state.statusText}
          </Text>
        </View>
      </View>
    );
  }
}

const loginStyles = StyleSheet.create({
  txtContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
    padding: 15,
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
  linkText: {
    color: 'black',
    textDecorationLine: 'underline',
  },
});

export default Login;