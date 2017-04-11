// @flow
// app/BookReader/BookText.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Animated,
  Props,
  State,
  Alert
} from 'react-native';

import SubPanel from './SubPanel'

import { authenticatedRESTRequest } from '../../../../RESTAccess.js';

class BookText extends Component{
  state:State
  constructor(props:Props){
    super(props);
    this.state = {
      textForPages: {0:"retrieving book text..."}
    };
  }

  componentWillReceiveProps(props:Props){
    var postBody = JSON.stringify({bookID: props.bookID, languageID: props.languageID});
    authenticatedRESTRequest("books/text", "POST", postBody)
    .then(function(r){
      return r.json()
    })
    .then(function(rawTextData){
      var textData = rawTextData
      .sort((a, b) => {
        if(a.pageNumber < b.pageNumber){
          return -1;
        }
        if(a.pageNumber > b.pageNumber){
          return 1;
        }
        return 0;
      })
      .map((d) => d.text);
      this.setState({textForPages: textData});
    }.bind(this))
    .catch(function(e){
      Alert.alert(e.message());
    });
  }

  componentDidMount(){
    this.slide();
  }

  slide(){
    this.refs.subPanel.slide();
  }

  render(){
      return (
        <SubPanel
          ref='subPanel'
          style={
            [this.props.style,
              {
                backgroundColor: '#1586BA'
              }
            ]
          } >
          <ScrollView>
            <Text style={{color:'white'}}>{this.state.textForPages[this.props.pageNumber]}</Text>
          </ScrollView>
        </SubPanel>
      );
  }
}

export default BookText;
