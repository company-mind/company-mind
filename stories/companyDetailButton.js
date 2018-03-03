import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CompanyDetailButton from '../src/components/CompanyDetailButton';

storiesOf('CompanyDetailButton', module)
  .add('default', () => (
    <CompanyDetailButton />
  ));
