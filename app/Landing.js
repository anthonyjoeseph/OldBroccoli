// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import {getAuthorizationHeaders} from './RESTAccess.js';

export default class Landing extends Component {
  constructor(props){
    super(props);
    getAuthorizationHeaders()
    .then(function(header){
      if(header != null){
        this.props.navigation.navigate('Home', {authHeaders: header});
      }else{
        this.props.navigation.navigate('LogIn');
      }
    }.bind(this))
    .catch(function(){
      this.props.navigation.navigate('LogIn');
    });
  }
  render() {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}
