import React, { Component } from 'react';
import { Button, Icon, Grid, Segment, Header } from 'semantic-ui-react';
import styled from 'styled-components';

// Sementic UI(Grid, Button, Header, Segment)

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
          <Segment stacked textAlign="center" padded="very">
            <Button color="google plus" fluid onClick={this.props.onGoogleLogin}>
              <Icon name="google plus" /> 구글로 로그인
            </Button>
            <Button color="twitter" fluid onClick={this.props.onTwitterLogin} style={{ marginTop: '10px' }}>
              <Icon name="twitter" /> 트위터로 로그인
            </Button>
            <Button color="facebook" fluid onClick={this.props.onFaceBookLogin} style={{ marginTop: '10px' }}>
              <Icon name="facebook" /> 구글로 로그인
            </Button>
          </Segment>
        </Grid.Column>
      </FullHeightGrid>
    );
  }
}
