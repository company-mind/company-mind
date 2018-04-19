import React from 'react';
import { storiesOf } from '@storybook/react';
import TopMenu from '../src/components/TopMenu';

storiesOf('TopMenu', module)
  .add('default', () => (
    <TopMenu />
  ));
