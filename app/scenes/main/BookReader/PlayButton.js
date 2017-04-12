// app/BookReader/PlayButton.js

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

import Sound from 'react-native-sound';

class PlayButton extends Component {

  constructor(props){
    super(props);

    this.music = new Sound("http://readbroccoli.com:3000/littleFrog/sfx/p1-click-anywhere.mp3", null, this.props.authHeaders, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        console.log('duration in seconds: ' + this.music.getDuration() +
            'number of channels: ' + this.music.getNumberOfChannels());
      }
    });
    this.isPlaying = false;

    this.playPause.bind(this);
  }

  playPause(){
    if(this.isPlaying){
      this.music.pause();
      this.isPlaying = false;
    }else{
      this.music.play();
      this.isPlaying = true;
    }
  }

  render(){
      return (
        <TouchableWithoutFeedback onPress={() => {this.playPause();}}>
          <View style={this.props.style}>
            <View
              style={{
                  flex:1,
                  backgroundColor: 'orange',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center'
              }}>
              <Text style={{color:'white', fontSize: 40}}>{this.props.language.name}</Text>
              <Text style={{color:'white', fontSize: 40}}>{this.props.character.name}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
  }
}

export default PlayButton;
