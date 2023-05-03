import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ContactUserDetails extends Component {
  constructor(props) {
    super(props);
  };

  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  };

  render() {
    return (
      <View>
        <View style={ContactUserStyles.txtContainer}>
          <Text style={ContactUserStyles.titleText}>Contact Details</Text>
        </View>
        <View style={ContactUserStyles.txtContainer}>
          <Text style={ContactUserStyles.subHeadText}>First Name</Text>
          <Text style={ContactUserStyles.elements}>
            {this.props.firstName}
          </Text>
          <Text style={ContactUserStyles.subHeadText}>Last Name</Text>
          <Text style={ContactUserStyles.elements}>
            {this.props.lastName}
          </Text>
          <Text style={ContactUserStyles.subHeadText}>Email</Text>
          <Text style={ContactUserStyles.elements}>
            {this.props.email}
          </Text>
        </View>
      </View>
    );
  }
}

const ContactUserStyles = StyleSheet.create({
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
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subHeadText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ContactUserDetails;
