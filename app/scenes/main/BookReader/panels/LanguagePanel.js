// @flow
// app/BookReader/LanguagePanel.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';

import RadioButtonRow from './RadioButtonRow';
import SubPanel from './SubPanel'

class LanguagePanel extends Component{
  constructor(props){
    super(props);
    var languageText = props.languages.map((l) => l.name);
    this.state = {languageText}
  }

  componentWillReceiveProps(props){
    var languageText = props.languages.map((l) => l.name);
    this.setState({languageText});
  }

  slide(){
    this.refs.subPanel.slide();
  }

  render(){
      return (
        <SubPanel
          ref='subPanel'
          style={[
            this.props.style,
            {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'stretch'
            }]}>
            <RadioButtonRow
              options={this.state.languageText}
              onSelection={
                function(selection){
                  var filteredLanguageObjects = this.props.languages.filter(
                    function(l){
                      return l.name===selection;
                    });
                  var language = filteredLanguageObjects[0];
                  this.props.onChangeLanguage(language);
                }.bind(this)
              }
            />
        </SubPanel>
      );
  }
}

export default LanguagePanel;
