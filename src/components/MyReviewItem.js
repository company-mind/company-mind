import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import Emotion from './Emotion';

const ReviewGrid = styled(Grid)`
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px !important;
  margin-left: 15px !important;
  height: 90px;
`;

const ReviewHeader = styled.header`
  width: 28%;
  font-size: 1.2rem;
  font-weight: 700;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ReviewText = styled.p`
  color: #495057;
  font-size: 0.9rem;
  word-wrap: break-word;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 45%;
  margin-left: -10px;
`;

const EmojiScore = styled.div`
  font-size: 64px;
  margin-top: -18px;
`;

const MyReviewItem = props => (
  <ReviewGrid>
    <Grid.Row>
      <ReviewHeader>{props.review.companyName}</ReviewHeader>
      <ReviewText>{props.review.content}</ReviewText>
      <EmojiScore>
        <Emotion score={props.review.emotion} />
      </EmojiScore>
    </Grid.Row>
  </ReviewGrid>
);

export default MyReviewItem;
