import React, { Component } from 'react';
import { Card, Form, Image, Input, Label, List, Message, TextArea, Transition } from 'semantic-ui-react';
import * as firebase from 'firebase';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  margin: 0 auto;
  margin-top: 10px;
  width: 340px;
`

const StyledList = styled(List)`
  margin: 0 auto;
  text-align: center;
`

export default class ReviewForm extends Component {
  static defaultProps = {
    errorMassage: '',
    onSubmit: () => {},
    creating: false,
  }

  state = {
    emotion: 0,
    content: '',
  }

  handleEmojiClick = (emotion) => {
    this.setState({ emotion });
  }

  handleChange = (e) => {
    const content = e.target.value;
    this.setState({ content });
  }

  handleSubmit () {
    this.props.onSubmit(this.state);
  }

  render() {
    const textCount = this.state.content.length;
    return (
      <StyledForm>
        <StyledList horizontal size="massive">
          <List.Item link onClick={() => this.handleEmojiClick(1)}>
            <span>😡</span>
          </List.Item>
          <List.Item link onClick={() => this.handleEmojiClick(2)}>
            <span>😭</span>
          </List.Item>
          <List.Item link onClick={() => this.handleEmojiClick(3)}>
            <span>😄</span>
          </List.Item>
          <List.Item link onClick={() => this.handleEmojiClick(4)}>
            <span>😍</span>
          </List.Item>
        </StyledList>
        <Form.Field>
          <TextArea placeholder='리뷰를 남겨주세요. 140자 까지 남길 수 있습니다.' onChange={this.handleChange} />
          {textCount > 140 ?
            <Transition.Group animation='shake' duration='500' visible>
              <Label color='red' attached='bottom right'>140자를 넘었습니다.</Label>
            </Transition.Group>
            : null}
        </Form.Field>
        <Form.Button
          color={
            textCount > 140 || textCount < 10 && textCount > 0 ? 'grey'
            : textCount <= 140 && textCount > 120 ? 'red'
            : textCount > 90 && textCount <= 120 ? 'orange'
            : 'green'
          }
          floated='right'
          disabled={
            textCount > 140 || textCount < 10 && textCount >= 1
          }
          >
          {
            textCount > 0 ? `${textCount}/140` : '등록'
          }
        </Form.Button>
      </StyledForm>
    );
  }
}
