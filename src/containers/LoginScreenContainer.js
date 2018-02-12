import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';

import LoginScreen from '../components/LoginScreen';

export default class LoginScreenContainer extends Component {
  state = {
    redirectToNickname: false,
  };
  handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      redirectToNickname: true,
    });
  };
  handleTwitterLogin = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      redirectToNickname: true,
    });
  };
  handleFaceBookLogin = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      redirectToNickname: true,
    });
  };
  render() {
    if (this.state.redirectToNickname) {
      return <Redirect to="/nickname" />;
    }
    return (
      <LoginScreen
        onGoogleLogin={this.handleGoogleLogin}
        onTwitterLogin={this.handleTwitterLogin}
        onFaceBookLogin={this.handleFaceBookLogin}
      />
    );
  }
}
