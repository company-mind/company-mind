import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import LoginScreen from '../components/LoginScreen';
import NicknameScreen from '../components/NicknameScreen';

export default class LoginScreenContainer extends Component {
  state = {
    nickname: '',
    isLoggedIn: false,
    hasNickname: false,
    isSubmitEnabled: false,
    isNicknameLoading: false,
    error: null,
  };

  handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      isLoggedIn: true,
    });
  };
  handleTwitterLogin = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      isLoggedIn: true,
    });
  };
  handleFaceBookLogin = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      isLoggedIn: true,
    });
  };

  handleNicknameChange = (e) => {
    this.setState({ error: null });
    const regex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\w]{2,16}$/;
    if (regex.test(e.target.value)) {
      this.setState({
        isSubmitEnabled: true,
        nickname: e.target.value,
      });
    } else {
      this.setState({
        error: '2자 이상, 16자 이하로 입력해주세요.',
        isSubmitEnabled: false,
        nickname: e.target.value,
      });
    }
    this.setState({ isNicknameLoading: true });
    firebase
      .database()
      .ref('users')
      .orderByChild('nickname')
      .equalTo(e.target.value)
      .once(
        'value',
        _.debounce((snap) => {
          const a = snap.exists();
          if (a) {
            this.setState({
              isSubmitEnabled: false,
              error: '이미 존재하는 닉네임입니다.',
              isNicknameLoading: false,
            });
          }
          this.setState({ isNicknameLoading: false });
        }, 100),
      );
  };

  handleSubmit = async () => {
    const { nickname } = this.state;
    const { uid } = firebase.auth().currentUser;
    await firebase
      .database()
      .ref(`users/${uid}`)
      .set({
        nickname,
      });
  };

  render() {
    const {
      nickname,
      isLoggedIn,
      hasNickname,
      isSubmitEnabled,
      isNicknameLoading,
      error,
    } = this.state;
    if (isLoggedIn && hasNickname) {
      return <Redirect to="/main" />;
    } else if (isLoggedIn && !hasNickname) {
      return (
        <NicknameScreen
          loading={isNicknameLoading}
          nickname={nickname}
          error={error}
          isEnabled={isSubmitEnabled}
          handleNicknameChange={this.handleNicknameChange}
          handleSubmit={this.handleSubmit}
        />
      );
    } else if (!isLoggedIn && !hasNickname) {
      return (
        <LoginScreen
          onGoogleLogin={this.handleGoogleLogin}
          onTwitterLogin={this.handleTwitterLogin}
          onFaceBookLogin={this.handleFaceBookLogin}
        />
      );
    }
    return null;
  }
}
