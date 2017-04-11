// @flow

import React from 'react';
import { StackNavigator } from 'react-navigation';
import Landing from './Landing';
import LogInPage from './scenes/main/LogInPage/LogInPage';
import SignUpPage from './scenes/main/SignUpPage/SignUpPage';
import PaymentPage from './scenes/main/PaymentPage/PaymentPage';
import HomePage from './scenes/main/HomePage/HomePage';
import AccountPage from './scenes/main/AccountPage/AccountPage';
import ReferralPage from './scenes/main/ReferralPage/ReferralPage';
import StatsPage from './scenes/main/StatsPage/StatsPage';
import BookReader from './scenes/main/BookReader/BookReader';

export const Screens = StackNavigator({
  Landing: {
    screen: Landing
  },
  LogIn: {
    screen: LogInPage
  },
  SignUp: {
    screen: SignUpPage
  },
  Payment: {
    screen: PaymentPage
  },
  Home: {
    screen: HomePage
  },
  Account: {
    screen: AccountPage
  },
  Referral: {
    screen: ReferralPage
  },
  Stats: {
    screen: StatsPage
  },
  BookReader: {
    screen: BookReader
  }
}, {
  headerMode:'none'
});
