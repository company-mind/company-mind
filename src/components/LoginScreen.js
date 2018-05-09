import React, { Component } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import { company2, comma } from '../assets/images';

const FullHeightGrid = styled(Grid)`
  height: 100vh !important;
  /* background: url(${company2}) no-repeat; */
  background-size: 100% 100%;
  background-image: url(${company2});
  background-repeat: no-repeat;
  margin: 0px !important;
`;

const Logo = styled.div`
  background: url(${comma}) 100% no-repeat;
  background-size: cover;
  width: 380px;
  height: 200px;
`;

export default class LoginScreen extends Component {
  static defaultProps = {
    onGoogleLogin: () => {},
    onTwitterLogin: () => {},
    onFaceBookLogin: () => {},
  };

  render() {
    return (
      <FullHeightGrid centered verticalAlign="middle">
        <Grid.Row>
          <Grid.Column style={{ width: '400px' }}>
            <Logo />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ marginTop: '-100px', width: '270px' }}>
            <Button
              color="google plus"
              fluid
              onClick={this.props.onGoogleLogin}
              style={{ fontSize: '16px' }}
            >
              <Icon name="google plus" /> 구글로 로그인
            </Button>
            <Button
              color="twitter"
              fluid
              onClick={this.props.onTwitterLogin}
              style={{ marginTop: '20px', fontSize: '16px' }}
            >
              <Icon name="twitter" /> 트위터로 로그인
            </Button>
            <Button
              color="facebook"
              fluid
              onClick={this.props.onFaceBookLogin}
              style={{ marginTop: '20px', fontSize: '16px' }}
            >
              <Icon name="facebook" /> 페이스북으로 로그인
            </Button>
          </Grid.Column>
        </Grid.Row>
      </FullHeightGrid>
    );
  }
}
