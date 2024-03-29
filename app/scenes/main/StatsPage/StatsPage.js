// app/BookInfoPage.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Button from 'react-native-button';

class StatsPage extends Component {
  component
  render() {
    return (
      <View>
        <Button
          containerStyle={{padding:5, height:45, overflow:'hidden', borderRadius:40, backgroundColor: 'white'}}
          style={{textAlign: 'center', backgroundColor: '#FFFFFF', color: 'rgb(57, 166, 198)', fontSize:30}}
          onPress={() => {this.props.navigation.goBack()}}
        >B</Button>
        <Text>User stats here</Text>
      </View>
    );
  }
}

export default StatsPage;
