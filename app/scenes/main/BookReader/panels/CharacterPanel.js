// app/BookReader/LanguagePanel.js

import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

import SubPanel from './SubPanel';
import RadioButtonRow from './RadioButtonRow';

class CharacterPanel extends Component{
  constructor(props){
    super(props);

    var characterText = props.characters.map((c) => c.name);
    this.state = {
      characterText
    };
    this.onSelection = this.onSelection.bind(this);
  }

  componentWillReceiveProps(props){
    var characterText = props.characters.map((c) => c.name);
    this.setState({characterText});
  }

  slide(){
    this.refs.subPanel.slide();
  }
  onSelection(selection){
    var filteredCharacterObjects = this.props.characters.filter(
      function(c){
        return c.name===selection;
      });
    var character = filteredCharacterObjects[0];
    this.props.onChangeCharacter(character);
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
              options={this.state.characterText}
              onSelection={this.onSelection}
            />
        </SubPanel>
      );
  }
}
/*

*/

export default CharacterPanel;
