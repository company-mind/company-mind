import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CompanyArticle from '../src/components/CompanyArticle';

const company = {
    id: 'review0',
    name: '삼성',
    group: '반도체',
    address: '서울',
    scrapScore: '100',
    reviewScore: '100',
    emotionScore: '5',
  }

storiesOf('CompanyArticle', module)
  .add('default', () => (
    <CompanyArticle {...company} />
  ));
