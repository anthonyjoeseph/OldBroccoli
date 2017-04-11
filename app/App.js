// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Screens } from './Router'

import {getAuthorizationHeaders} from './RESTAccess.js';

export default class App extends Component {
  render() {
    return <Screens />;
  }
}
