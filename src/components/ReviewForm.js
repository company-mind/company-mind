import React, { Component } from 'react';
import { Form, Header, Label, Segment, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
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
    clickedEmoji: null,
    content: '',
  };

  handleEmojiClick = (emotion) => {
    this.setState({ emotion, clickedEmoji: emotion });
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
    const { content, clickedEmoji } = this.state;
    const { creating } = this.props;
    const textCount = content.length;
    return (
      <Segment>
        <StyledForm>
          <Header size="small">😀 내 감정 남기기</Header>
          <Segment.Group horizontal>
            <Segment
              textAlign="center"
              stacked={clickedEmoji === 1}
              color={clickedEmoji === 1 ? 'red' : null}
              onClick={() => this.handleEmojiClick(1)}
            >
              <span style={{ fontSize: '48px' }}>😡</span>
            </Segment>
            <Segment
              textAlign="center"
              stacked={clickedEmoji === 2}
              color={clickedEmoji === 2 ? 'orange' : null}
              onClick={() => this.handleEmojiClick(2)}
            >
              <span style={{ fontSize: '48px' }}>😭</span>
            </Segment>
            <Segment
              textAlign="center"
              stacked={clickedEmoji === 3}
              color={clickedEmoji === 3 ? 'yellow' : null}
              onClick={() => this.handleEmojiClick(3)}
            >
              <span style={{ fontSize: '48px' }}>😄</span>
            </Segment>
            <Segment
              textAlign="center"
              stacked={clickedEmoji === 4}
              color={clickedEmoji === 4 ? 'green' : null}
              onClick={() => this.handleEmojiClick(4)}
            >
              <span style={{ fontSize: '48px' }}>😍</span>
            </Segment>
          </Segment.Group>
          <Header size="small">🤔 이 회사랑 무슨 사이인가요?</Header>
          <Form.Field control="select" value={this.state.writer} onChange={this.handleWriterChange}>
            <option value="다니고 있어요">다니고 있어요</option>
            <option value="다니다가 나왔어요">다니다가 나왔어요</option>
            <option value="들어가고 싶어요">들어가고 싶어요</option>
            <option value="관심있어요">관심있어요</option>
          </Form.Field>
          <Header size="small">✏️ 짤막 리뷰 남기기</Header>
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
      </Segment>
    );
  }
}
