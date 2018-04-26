import React, { Component } from 'react';
import { Button, Header, Icon, Grid, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import { city } from '../assets/images';

const FullHeightGrid = styled(Grid)`
  height: 102vh !important;
  background: papayawhip url(${city}) 100% no-repeat;
`;

const MainHeader = styled(Header)`
  font-size: 64px !important;
  font-weight: 900 !important;
  color: #fff !important;
  text-shadow: 1px 1px 8px rgba(10, 44, 78, 0.6);
`;

const WelcomeHeader = styled(Header)`
  color: #fff !important;
  font-size: 36px !important;
  text-shadow: 1px 1px 20px rgba(10, 44, 78, 0.8);
`;

const LoginHeader = styled(Header)`
  color: #fff !important;
  font-size: 22px !important;
  margin-top: -8px !important;
  text-shadow: 1px 1px 8px rgba(10, 44, 78, 0.6);
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
        <Grid.Column style={{ width: '300px' }}>
          <MainHeader as="h1" textAlign="center" size="huge">
            Company Mind
          </MainHeader>
          <WelcomeHeader as="h2" textAlign="center">
            반갑습니다!
          </WelcomeHeader>
          <LoginHeader as="h3" textAlign="center">
            먼저 로그인 해주세요
          </LoginHeader>
          <Segment textAlign="center" padded>
            <Button color="google plus" fluid onClick={this.props.onGoogleLogin}>
              <Icon name="google plus" /> 구글로 로그인
            </Button>
            <Button
              color="twitter"
              fluid
              onClick={this.props.onTwitterLogin}
              style={{ marginTop: '10px' }}
            >
              <Icon name="twitter" /> 트위터로 로그인
            </Button>
            <Button
              color="facebook"
              fluid
              onClick={this.props.onFaceBookLogin}
              style={{ marginTop: '10px' }}
            >
              <Icon name="facebook" /> 페이스북으로 로그인
            </Button>
          </Segment>
        </Grid.Column>
      </FullHeightGrid>
    );
  }
}
