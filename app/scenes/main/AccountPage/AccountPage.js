// app/BookInfoPage.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Button from 'react-native-button';

import {clearJWT} from '../../../RESTAccess.js';

class AccountPage extends Component {
  render() {
    return (
      <View>
        <Button
          containerStyle={{padding:5, height:45, overflow:'hidden', borderRadius:40, backgroundColor: 'white'}}
          style={{textAlign: 'center', backgroundColor: '#FFFFFF', color: 'rgb(57, 166, 198)', fontSize:30}}
          onPress={() => {this.props.navigation.goBack()}}
        >B</Button>
        <Button
          containerStyle={{padding:5, height:45, overflow:'hidden', borderRadius:40, backgroundColor: 'white'}}
          style={{textAlign: 'center', backgroundColor: '#FFFFFF', color: 'rgb(57, 166, 198)', fontSize:30}}
          onPress={() => {
            clearJWT();
            this.props.navigation.navigate('LogIn');
          }}
        >Sign Out</Button>
        <Text>Account Details</Text>
      </View>
    );
  }
}

export default AccountPage;
