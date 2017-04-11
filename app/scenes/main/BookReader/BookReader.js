// @flow
// app/BookReader/BookReader.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Props,
  State,
  Alert
} from 'react-native';

import Button from 'react-native-button';

import BookImages from './viewpager/BookImages'
import MainPanel from './panels/MainPanel'
import PlayButton from './PlayButton'
import BookControl from './BookControl'
import QuizPage from '../../modal/QuizPage/QuizPage'

import {getAuthorizationHeaders, authenticatedRESTRequest} from '../../../RESTAccess.js';

class BookReader extends Component {
  state:State
  constructor(props:Props) {
    super(props)

    var {width, height} = Dimensions.get('window');
    this.dimensions = {
      width: width + 30,
      height: height
    };
    var bookData = this.props.navigation.state.params.data;
    this.bookID = bookData.id;
    this.picAspectRatio = bookData.aspectRatio;
    this.picWidth = height * this.picAspectRatio;

    this.getImagesAndQuizzes()
    .then(function(data){
      return data.json();
    })
    .then(function(data){
      this.setState({pagesData: data});
    }.bind(this))
    .catch(function(e){
      Alert.alert(e.message);
    });

    this.state = {
      authHeaders: this.props.authHeaders,
      bookID: bookData.id,
      baseURI: bookData.baseURI,
      numPages: bookData.numPages,
      pageNumber: 0,
      characters: bookData.characterVoices,
      currentCharacter:bookData.characterVoices[0],
      languages: bookData.languages,
      currentLanguage: bookData.languages[0],
      pagesData: null,
      selectedQuiz: null,
      characterPanelVisible: false,
      languagePanelVisible: false,
      bookTextPanelVisible: true
    };

    this._onQuizSelect = this._onQuizSelect.bind(this);
    this._onChangePage = this._onChangePage.bind(this);
  }

  async getImagesAndQuizzes(){
    var jsonRequestBody = {bookID: this.bookID};
    var stringifiedRequestBody = JSON.stringify(jsonRequestBody);
    var imgAndQuizData = await authenticatedRESTRequest("quizzes/imagesAndQuizzes", "POST", stringifiedRequestBody);
    return imgAndQuizData;
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'row'}}>
        <MainPanel
          style={styles.interactionPanel}
          onPressHome={() => {
            this.props.navigation.goBack();
          }}
          onPressCharacter={
            function(newCharacter){
              this.refs.bookControl.slideCharacterPanel();
            }.bind(this)
          }
          onPressLanguage={
            function(newLanguage){
              this.refs.bookControl.slideLanguagePanel();
            }.bind(this)
          }
          onPressBookText={
            function(newLanguage){
              this.refs.bookControl.slideBookTextPanel();
            }.bind(this)
          }
        />
        <BookControl
          ref="bookControl"
          authHeaders={this.props.navigation.state.params.authHeaders}
          baseURI={this.state.baseURI}
          style={styles.bookControl}
          numPages={this.state.numPages}
          pageNumber={this.state.pageNumber}
          bookID={this.state.bookID}
          languages={this.state.languages}
          currentLanguage={this.state.currentLanguage}
          characters={this.state.characters}
          currentCharacter={this.state.currentCharacter}
          pagesData={this.state.pagesData}
          screenWidth={this.dimensions.width}
          screenHeight={this.dimensions.height}
          picWidth={this.picWidth}
          onQuizSelect={this._onQuizSelect}
          onChangePage={this._onChangePage}
          onChangeLanguage={
            function(newLanguage){
              this.setState({currentLanguage: newLanguage});
            }.bind(this)
          }
          onChangeCharacter={
            function(newCharacter){
              this.setState({currentCharacter: newCharacter});
            }.bind(this)
          }
        />
        <PlayButton style={styles.playButton}
          language={this.state.currentLanguage}
          character={this.state.currentCharacter}
        />
        {
          this.state.selectedQuiz != null
            ?
            <QuizPage
              style={{zIndex:5}}
              onDismiss={() => {this.setState({selectedQuiz: null})}}
              quizData={this.state.selectedQuiz}
            />
            :
            <View />
        }
      </View>
    );
  }
  _onChangePage(page){
    console.log(page);
    this.setState({
      pageNumber: page
    });
  }

  _onQuizSelect(quizData){
    this.setState({selectedQuiz: quizData});
  }
}

const styles = StyleSheet.create({
  interactionPanel:{
    zIndex: 2,
    width:50,
    backgroundColor:'transparent'
  },
  playButton:{
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 50
  },
  bookControl:{
    zIndex: 1
  }
});

export default BookReader;
