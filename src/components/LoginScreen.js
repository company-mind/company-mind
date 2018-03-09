import React, { Component } from 'react';
import { Button, Header, Icon, Grid, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const FullHeightGrid = styled(Grid)`
  height: 100vh;
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
        <Grid.Column style={{ width: '280px' }}>
          <Header as="h2" textAlign="center">
            반갑습니다!
          </Header>
          <Header as="h4" textAlign="center">
            로그인 해주세요
          </Header>
          <Segment stacked textAlign="center" padded="very">
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
              <Icon name="facebook" /> 구글로 로그인
            </Button>
          </Segment>
        </Grid.Column>
      </FullHeightGrid>
    );
  }
}
