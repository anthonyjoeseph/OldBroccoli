// app/QuizMultChoice.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import { RadioButtons } from 'react-native-radio-buttons';
import Button from 'react-native-button';

import DismissableFullscreenPopup from '../DismissableFullscreenPopup'
import QuizMultChoice from './QuizMultChoice'

class QuizPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowingQuestion: true,
      isAnswerCorrect: false
    };

    this.popupContent = this.popupContent.bind(this);
  }

  popupContent(){
    if(this.state.isShowingQuestion){
      return (
        <QuizMultChoice
          question={this.props.quizData[0].questions[0].text}
          options={this.props.quizData[0].questions[0].responses}
          onCorrect={() => { this.setState({isShowingQuestion: false, isAnswerCorrect: true}); } }
          onWrong={() => { this.setState({isShowingQuestion: false, isAnswerCorrect: false}); } }
        />
      );
    }else{
      return (
        <View style={{flexDirection:'column'}}>
          <Text>{(this.state.isAnswerCorrect ? 'Right!' : "Wrong!")}</Text>
          <Button onPress={()=>{this.refs.dismissableScreen.dismiss()}}>BACK</Button>
        </View>
      );
    }
  }

  render() {
    return (
      <DismissableFullscreenPopup
        ref='dismissableScreen'
        style={this.props.style}
        onDismiss={this.props.onDismiss}>
        <View style={styles.popupView}>
          {this.popupContent()}
        </View>
      </DismissableFullscreenPopup>
    )
  }
}

const styles = StyleSheet.create({
  popupView:{
    backgroundColor: 'white',
    width: 300,
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});

export default QuizPage;
