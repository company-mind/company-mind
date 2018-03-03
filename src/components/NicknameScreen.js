import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Label,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';


const FullHeightGrid = styled(Grid)`
  height: 100vh;
`;

export default class NicknameScreen extends Component {
  render() {
    const {
      loading,
      isEnabled,
      handleNicknameChange,
      handleSubmit,
      error,
    } = this.props;
    return (
      <FullHeightGrid centered verticalAlign="middle">
        <Grid.Column style={{ width: '280px' }}>
          <Segment textAlign="center">
            <Header>반갑습니다!</Header>
            <p style={{ color: 'grey' }}>닉네임을 입력해주세요.</p>
            <Form onSubmit={handleSubmit} style={{ width: '280px' }}>
              <Form.Field>
                <Input
                  loading={loading}
                  placeholder="한글, 영문, 숫자 입력이 가능합니다."
                  onChange={handleNicknameChange}
                />
                {error ? (
                  <Label pointing bottom color="red">
                    {error}
                  </Label>
                ) : null}
                {isEnabled ? (
                  <Label pointing bottom color="green">
                    입력 가능한 닉네임입니다.
                  </Label>
                ) : null}
              </Form.Field>
              <Button
                color={isEnabled ? 'green' : 'grey'}
                type="submit"
                disabled={!isEnabled}
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
