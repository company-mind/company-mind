import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import Emotion from './Emotion';

const ReviewGrid = styled(Grid)`
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px !important;
  margin-left: 20px !important;
  height: 90px;
`;

const ScrapHeader = styled.header`
  width: 28%;
  margin-right: -20px;
  font-size: 1.2rem;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const EmojiScore = styled.div`
  font-size: 64px;
  margin-top: -18px;
`;

const MyScrapItem = props => (
  <ReviewGrid>
    <Grid.Row>
      <ScrapHeader>{props.scrap.name}</ScrapHeader>
      <EmojiScore>
        <Emotion score={props.scrap.emotionScore} />
      </EmojiScore>
    </Grid.Row>
  </ReviewGrid>
);

export default MyScrapItem;
