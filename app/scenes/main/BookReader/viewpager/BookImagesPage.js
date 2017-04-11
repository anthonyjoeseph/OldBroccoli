// app/BookReader/BookPageImage.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform
} from 'react-native';

import TouchableOutline from './TouchableOutline';

import { baseImageURI } from '../../../../RESTAccess.js';

class BookImagesPage extends Component{
  constructor(props){
    super(props);
  }
  imagesAndQuizzes(){
    if(this.props.imagesAndQuizzes != null){
      return this.props.imagesAndQuizzes.map(
        function(imageData, index){
          var uri;
          var width = imageData.widthPercent * this.props.width;
          var height = imageData.heightPercent * this.props.height;
          var left = imageData.xPercent * this.props.width;
          var bottom = imageData.yPercent * this.props.height;
          if(imageData.hasOwnProperty('quizzes')){
            uri = baseImageURI() + this.props.baseURI + "/outlines/" + imageData.uri + ".png";
            return (
              <TouchableOutline
                key={index}
                source={{
                  uri: uri,
                  headers: this.props.authHeaders
                }}
                width={width}
                height={height}
                left={left}
                bottom={bottom}
                onPress={
                  function(){
                    this.props.onQuizSelect(imageData.quizzes);
                  }.bind(this)
                }
                tintColor={'red'}
              />
            );
          }else{
            uri = baseImageURI() + this.props.baseURI + "/animations/" + imageData.uri + ".gif";
            return (
              <Image
                key={index}
                source={{
                  uri: uri,
                  headers: this.props.authHeaders
                }}
                style={
                  {
                    position:'absolute',
                    left: left,
                    bottom: bottom,
                    width: width,
                    height: height
                  }
                }
              />
            );
          }
        }.bind(this)
      );
    }
  }
  render(){
    if(this.props.shouldRender){
      var pageURI = baseImageURI() + this.props.baseURI + "/pages/" + this.props.pageNumber + ".jpg";
      return (
        <View style={
          {
            width: this.props.width,
            height: this.props.height,
            flexDirection: 'row',
            justifyContent:'flex-start',
            alignItems:'stretch'
          }}>
          <Image
            resizeMode='contain'
            source={{
              uri: pageURI,
              headers: this.props.authHeaders
            }}
            style={{flex:1, width: null, justifyContent:'center', alignItems:'center'}}>
            {this.imagesAndQuizzes()}
          </Image>
        </View>
      );
    }else{
      return (
        <View
          width={this.props.width}
          height={this.props.height} />
      );
    }
  }
}

export default BookImagesPage;
