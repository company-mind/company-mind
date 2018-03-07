import React, { Component } from 'react';
import { Form, Label, List, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  margin: 0 auto;
  margin-top: 10px;
  width: 340px;
`;

const StyledList = styled(List)`
  margin: 0 auto;
  text-align: center;
`;

export default class ReviewForm extends Component {
  static defaultProps = {
    errorMessage: '',
    onSubmit: () => {},
    creating: false,
  };

  state = {
    companyId: this.props.match.params.companyId,
    writer: '재직자',
    emotion: null,
    content: '',
  };

  handleEmojiClick = (emotion) => {
    this.setState({ emotion });
  };

  handleWriterChange = (e) => {
    const writer = e.target.value;
    this.setState({ writer });
  };

  handleChange = (e) => {
    const content = e.target.value;
    this.setState({ content });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  render() {
    const { content } = this.state;
    const { creating } = this.props;
    const textCount = content.length;
    return (
      <StyledForm>
        <StyledList horizontal size="massive">
          <List.Item onClick={() => this.handleEmojiClick(1)}>😡</List.Item>
          <List.Item onClick={() => this.handleEmojiClick(2)}>😭</List.Item>
          <List.Item onClick={() => this.handleEmojiClick(3)}>😄</List.Item>
          <List.Item onClick={() => this.handleEmojiClick(4)}>😍</List.Item>
        </StyledList>
        <Form.Field
          control="select"
          value={this.state.writer}
          onChange={this.handleWriterChange}
        >
          <option value="재직자">재직자</option>
          <option value="퇴사자">퇴사자</option>
          <option value="구직자">구직자</option>
        </Form.Field>
        <Form.Field>
          <TextArea
            placeholder="리뷰를 남겨주세요. 10자 이상 140 이하로 남길 수 있습니다."
            onChange={this.handleChange}
          />
          {textCount > 140 ? (
            <Label color="red" attached="bottom right">
              140자를 넘었습니다.
            </Label>
          ) : null}
        </Form.Field>
        <Form.Button
          floated="right"
          color={
            textCount > 140 || (textCount < 10 && textCount > 0)
              ? 'grey'
              : textCount <= 140 && textCount > 120
                ? 'red'
                : textCount > 90 && textCount <= 120 ? 'orange' : 'green'
          }
          disabled={textCount > 140 || (textCount < 10 && textCount >= 1)}
          onClick={this.handleSubmit}
          loading={creating}
        >
          {textCount > 0 ? `${textCount}/140` : '등록'}
        </Form.Button>
      </StyledForm>
    );
  }
}
