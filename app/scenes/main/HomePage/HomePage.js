// @flow

// app/LogInForm.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Props,
  State,
  Button
} from 'react-native';

import Orientation from 'react-native-orientation';

import {getAuthorizationHeaders, clearJWT} from '../../../RESTAccess.js';

import ControlPanel from './ControlPanel';
import BookPicker from './BookPicker/BookPicker';
import UserPanel from './UserPanel';

class HomePage extends Component {
  state:State
  constructor(props:Props) {
    super(props);
    this.state = {
      showUserPanel: false
    };

    this.dismissUserPanel = this.dismissUserPanel.bind(this);
  }

  componentDidMount(){
    Orientation.lockToLandscapeLeft();
  }

  dismissUserPanel(){
    this.setState({showUserPanel: false});
  }

  async clearJWTAsync(){
    await clearJWT();
  }

  render(){
    return (
      <View style={styles.container}>
        <ControlPanel
          showUserPanel={
            function(){
              this.setState({showUserPanel:true});
            }.bind(this)
          }
        />
        <BookPicker
          authHeaders={this.props.navigation.state.params.authHeaders}
          onPressBook={function(data){this.props.navigation.navigate('BookReader', {data:data, authHeaders:this.props.navigation.state.params.authHeaders})}.bind(this)}/>
        {
          this.state.showUserPanel ?
            <UserPanel
              onDismiss={this.dismissUserPanel}
              accountPressed={() => {this.props.navigation.navigate('Account')}}
              referralPressed={() => {this.props.navigation.navigate('Referral')}}
              statsPressed={() => {this.props.navigation.navigate('Stats')}}
            /> : <View />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(57, 166, 198)',
    flex:1,
    flexDirection: 'column'
  }
});

export default HomePage;
