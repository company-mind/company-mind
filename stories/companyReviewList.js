import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CompanyReviewList from '../src/components/CompanyReviewList';

const reviewItem = [
  {
    id: 'review0',
    nickname: '이응',
    writer: '퇴사자',
    content: '이회사 너무 좋아요',
    emotion: 4,
    createdAt: "2017.02.24",
  },
  {
    id: 'review1',
    nickname: '으악',
    writer: '직장인',
    content: '죽을맛',
    emotion: 1,
    createdAt: "2017.02.25",
  },
]

storiesOf('CompanyReviewList', module)
  .add('default', () => (
    <CompanyReviewList reviewItem={reviewItem} />
  ));
