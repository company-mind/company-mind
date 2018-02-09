import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import LoginScreen from '../components/LoginScreen';

export default class LoginScreenContainer extends Component {
  state = {
    redirectToList: false,
  }
  handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      redirectToList: true,
    });
  }
  handleTwitterLogin = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      redirectToList: true,
    });
  }
  handleFaceBookLogin = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      redirectToList: true,
    });
  }
  render() {
    if (this.state.redirectToList) {
      return (
        <Redirect to="/list" />
      );
    }
    return (
      <LoginScreen onGoogleLogin={this.handleGoogleLogin} onTwitterLogin={this.handleTwitterLogin} onFaceBookLogin={this.handleFaceBookLogin} />
    );
  }
}
