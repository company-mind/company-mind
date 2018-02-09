import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const FullHeightGrid = styled(Grid)`
  height: 100vh;
`;

export default class NicknameScreen extends Component {
  render() {
    return (
      <FullHeightGrid centered verticalAlign="middle">
        <Grid.Column style={{ width: '280px' }}>
          <Segment textAlign="center">
            <Header>반갑습니다!</Header>
            <p style={{ color: 'grey' }}>닉네임을 입력해주세요.</p>
            <Form style={{ width: '280px' }}>
              <Form.Field>
                <input placeholder="한글, 영문, '-' 입력이 가능합니다." />
              </Form.Field>
              <Button color="red" type="reset">
                취소
              </Button>
              <Button color="green" type="submit">
                결정
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </FullHeightGrid>
    );
  }
}
