import React, { Fragment } from 'react';
import { Divider, Grid } from 'semantic-ui-react';
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

const ReviewDivider = styled(Divider)`
  box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.2) !important;
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

const MyReviewList = props => (
  <Fragment>
    {props.myReviews.map(review => (
      <Fragment key={review.time}>
        <ReviewGrid>
          <Grid.Row>
            <ReviewHeader>{review.companyName}</ReviewHeader>
            <ReviewText>{review.content}</ReviewText>
            <EmojiScore>
              <Emotion score={review.emotion} />
            </EmojiScore>
          </Grid.Row>
        </ReviewGrid>
        <ReviewDivider />
      </Fragment>
    ))}
  </Fragment>
);

export default MyReviewList;
