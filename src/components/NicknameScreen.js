import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import * as firebase from 'firebase';

const FullHeightGrid = styled(Grid)`
  height: 100vh;
`;

export default class NicknameScreen extends Component {
  state = {
    nickname: '',
    redirectToMain: false,
  };

  handleNicknameChange = e => this.setState({ nickname: e.target.value });

  handleSubmit = async () => {
    const { uid } = firebase.auth().currentUser;
    await firebase
      .database()
      .ref(`users/${uid}`)
      .set({
        nickname: this.state.nickname,
      });
    this.setState({ redirectToMain: true });
  };

  render() {
    if (this.state.redirectToMain) {
      return <Redirect to="/main" />;
    }
    const { nickname } = this.state;
    const isEnabled = nickname.length >= 4;
    return (
      <FullHeightGrid centered verticalAlign="middle">
        <Grid.Column style={{ width: '280px' }}>
          <Segment textAlign="center">
            <Header>반갑습니다!</Header>
            <p style={{ color: 'grey' }}>닉네임을 입력해주세요.</p>
            <Form style={{ width: '280px' }}>
              <Form.Field>
                <input
                  placeholder="한글, 영문, 숫자 입력이 가능합니다."
                  onChange={this.handleNicknameChange}
                />
              </Form.Field>
              <Button color="red" type="reset">
                취소
              </Button>
              <Button
                color="green"
                type="submit"
                disabled={!isEnabled}
                onClick={this.handleSubmit}
              >
                결정
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </FullHeightGrid>
    );
  }
}
