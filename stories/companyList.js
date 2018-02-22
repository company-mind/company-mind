import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CompanyList from '../src/components/CompanyList';

const companies = [
  {
    id: 'review0',
    name: '삼성',
    group: '반도체',
    address: '서울',
    scrapScore: '100',
    reviewScore: '100',
    emotionScore: '5',
  },
  {
    id: 'review1',
    name: '네이버',
    group: '웹',
    address: '판교',
    scrapScore: '200',
    reviewScore: '200',
    emotionScore: '5',
  },
]

storiesOf('CompanyList', module)
  .add('default', () => (
    <CompanyList companies={companies} />
  ));
