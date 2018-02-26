import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import LoginScreen from '../components/LoginScreen';
import NicknameScreen from '../components/NicknameScreen';

const NICKNAME_PATTERN = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\w]{2,16}$/; // *****

export default class LoginScreenContainer extends Component {
  state = {
    nickname: '',
    isUserLoggedIn: false,
    hasNickname: false,
    isPatternValidated: false,
    isDuplicateValidated: false,
    isNicknameLoading: false,
    error: null,
  };

  handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      isUserLoggedIn: true,
    });
  };
  handleTwitterLogin = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      isUserLoggedIn: true,
    });
  };
  handleFaceBookLogin = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      isUserLoggedIn: true,
    });
  };

  checkDuplicatedNickname = _.debounce(async (nickname) => {
    this.setState({ isNicknameLoading: true });
    const snap = await firebase
      .database()
      .ref('users')
      .orderByChild('nickname')
      .equalTo(nickname)
      .once('value');
    const a = snap.exists();
    if (a) {
      this.setState({
        isDuplicateValidated: false,
        error: '이미 존재하는 닉네임입니다.',
        isNicknameLoading: false,
      });
    } else {
      this.setState({
        isDuplicateValidated: true,
      })
    }
    this.setState({ isNicknameLoading: false });
  }, 500);

  handleNicknameChange = (e) => {
    this.setState({ error: null });
    if (NICKNAME_PATTERN.test(e.target.value)) {
      this.setState({
        isPatternValidated: true,
        nickname: e.target.value,
      });
    } else {
      this.setState({
        error: '2자 이상, 16자 이하로 입력해주세요.', // 주의: 18자 이면서 firebase에선 통과된 경우 등등
        isPatternValidated: false, // 속성 늘리기
        nickname: e.target.value,
      });
    }
    this.checkDuplicatedNickname(e.target.value);
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
    this.setState({ hasNickname: true });
  };

  render() {
    const {
      nickname,
      isUserLoggedIn,
      hasNickname,
      isPatternValidated,
      isDuplicateValidated,
      isNicknameLoading,
      error,
    } = this.state;

    if (isUserLoggedIn && hasNickname) {
      return <Redirect to="/list" />;
    } else if (isUserLoggedIn && !hasNickname) {
      return (
        <NicknameScreen
          loading={isNicknameLoading}
          nickname={nickname}
          error={error}
          isEnabled={ isPatternValidated && isDuplicateValidated}
          handleNicknameChange={this.handleNicknameChange}
          handleSubmit={this.handleSubmit}
        />
      );
    } else if (!isUserLoggedIn && !hasNickname) {
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
