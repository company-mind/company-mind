import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Link } from 'react-router-dom';
import CompanyDetailOnButton from '../src/components/CompanyDetailOnButton';

storiesOf('CompanyDetailOnButton', module)
  .add('default', () => (
    <CompanyDetailOnButton />
  ));
