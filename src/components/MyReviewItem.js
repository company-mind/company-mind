import React from 'react';
import styled from 'styled-components';

import Emotion from './Emotion';

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  height: 100px;
  margin-left: 9px;
`;

const ReviewHeader = styled.header`
  grid-area: 1 / 1 / 3 / 4;
  font-size: 1.2rem;
  font-weight: 700;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ReviewHeaderSpan = styled.span`
  font-size: 0.9rem;
  color: #495057;
  padding-left: 2px;
`;

const ReviewTextHeader = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  padding-top: 8px;

  grid-area: 2 / 1 / 3 / 3;
`;

const ReviewText = styled.p`
  margin-top: 4px;
  grid-area: 3 / 1 / 5 / 4;
  color: #495057;
  font-size: 0.9rem;
  word-wrap: break-word;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  border-radius: 6px;
  background: #efefef;
  padding: 4px;
`;

const EmojiScoreHeader = styled.span`
  font-size: 0.7rem;
  display: block;
  font-weight: 700;
  grid-area: 1/4/5/5;
  margin: 0 auto;
  padding-top: 8px;
  text-align: center;
`;

const EmojiScore = styled.div`
  grid-area: 1 / 4 / 5 / 5;
  font-size: 64px;
  margin-top: 10px;
  text-align: center;
`;

const MyReviewItem = props => (
  <ReviewGrid>
    {console.log(props)}
    <ReviewHeader>
      {props.review.companyName}
      <ReviewHeaderSpan>에 리뷰를 남겼습니다.</ReviewHeaderSpan>
    </ReviewHeader>
    <ReviewTextHeader>텍스트 리뷰🖋</ReviewTextHeader>
    <ReviewText>{props.review.content}</ReviewText>
    <EmojiScoreHeader>감정점수 {props.review.emotion}점!</EmojiScoreHeader>
    <EmojiScore>
      <Emotion score={props.review.emotion} />
    </EmojiScore>
  </ReviewGrid>
);

export default MyReviewItem;
