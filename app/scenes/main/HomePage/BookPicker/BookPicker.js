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
  ScrollView,
  ListView,
  Alert
} from 'react-native';

import Button from 'react-native-button';

import {hasJWT, fetchAndPersistJWT, authenticatedRESTRequest} from '../../../../RESTAccess.js';

import BookRow from './BookRow';

class BookPicker extends Component {
  state:State;

  constructor(props:Props) {
    super(props);

    this.countriesInContinents = {
      "Americas":["usa", "brazil", "cuba", "hawaii", "chile"],
      "Europe":["france", "spain", "england", "italy", "sweden"],
      "Africa":["egypt", "Iraq"],
      "Austrailia":["austrailia"],
      "Asia":["japan", "china", "Korea"]
    };

    this.state = {};

    this.getBookDataAsync()
    .then(function(data){
      return data.json();
    }).then(function(json){
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var tmpState = {};
      for (let continent of Object.keys(this.countriesInContinents)) {
        var countries = this.countriesInContinents[continent];
        var continentData = json.filter(
          function(bookData){
            return countries.includes(bookData.country);
          }
        );
        var continentDataSource = ds.cloneWithRows(continentData)
        tmpState[continent] = continentDataSource;
      }
      this.setState(tmpState);
    }.bind(this))
    .catch(function(e){
      Alert.alert("MAYDAY MAYDAY NETWORK ERROR" + e.message);
    });
  }

  async getBookDataAsync(){
    var allData = await authenticatedRESTRequest("books/allMeta", "GET", "");
    return allData
  }

  render(){
    return (
      <ScrollView>
        {Object.keys(this.countriesInContinents).map(function(country, key){
          if(this.state[country] != null){
            var dataSource = this.state[country];
            return (
              <View key={key}>
                <Text>{country}</Text>
                <ListView
                  style={{backgroundColor:'green'}}
                  enableEmptySections={true}//TODO remove this!!
                  contentContainerStyle={styles.listView}
                  height={150}
                  horizontal={true}
                  dataSource={dataSource}
                  renderRow={
                    (rowData) => {
                      return (
                        <BookRow
                          authHeaders={this.props.authHeaders}
                          data={rowData}
                          onPress={function(){
                            this.props.onPressBook(rowData);
                          }.bind(this)}/>
                      );
                    }
                  }
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
              </View>
            );
          }
        }.bind(this))}
      </ScrollView>
    );
  }
}

const styles = {
  listView: {
    justifyContent: 'center',
    alignItems:'center'
  },
  separator: {
    flex: 1,
    width: StyleSheet.hairlineWidth * 5,
    backgroundColor: '#8E8E8E',
    height:70
  }
}

export default BookPicker;
