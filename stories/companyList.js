import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CompanyList from '../src/components/CompanyList';

const companies = [
  {
    id: 'review0',
    companyName: '삼성',
    companyGroup: '반도체',
    companyAddress: '서울',
    scrapScore: '100',
    reviewScore: '100',
    emotionScore: '5',
  },
  {
    id: 'review1',
    companyName: '네이버',
    companyGroup: '웹',
    companyAddress: '판교',
    scrapScore: '200',
    reviewScore: '200',
    emotionScore: '5',
  },
]

storiesOf('CompanyList', module)
  .add('default', () => (
    <CompanyList companies={companies} />
  ));
