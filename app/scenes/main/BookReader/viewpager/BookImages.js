// @flow
// app/BookReader/BookImages.js

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';

import ViewPager from './ViewPager';
import BookImagesPage from './BookImagesPage';

import {baseImageURI} from '../../../../RESTAccess.js';

function isNearInt(value, err) {
  var nearbyInt = Math.round(value);
  return Math.abs(value - nearbyInt) < 0.05;
}

class BookImages extends Component {
  render(){
    return (
      <View style={{width:this.props.width, height:this.props.height}}>
        <ViewPager
          numPages={this.props.numPages}
          renderRange={4}
          onPageScroll={this.props.onPageScroll}>
            {
              //a little hack to make a range of numbers
              //from 0...this.props.numPages
              Array(this.props.numPages).fill().map((_, i) => i)
              .map(
                 function(pageNumber, index){
                   if(this.props.pagesData != null){
                     var data = this.props.pagesData.filter(
                       function(pageData){
                         return pageData.pageNumber == pageNumber;
                       }
                     ).map(function(pageData){
                       return pageData.images;
                     })[0];
                     return (
                       <BookImagesPage
                        key={index}
                        authHeaders={this.props.authHeaders}
                        baseURI={this.props.baseURI}
                        pageNumber={pageNumber}
                        imagesAndQuizzes={data}
                        onQuizSelect={this.props.onQuizSelect}
                        width={this.props.width}
                        height={this.props.height} />
                      );
                   }else{
                     return <View key={index} style={{backgroundColor: 'grey'}}/>
                   }
                 }.bind(this)
               )
            }
        </ViewPager>
      </View>
    );
  }
}
export default BookImages;
