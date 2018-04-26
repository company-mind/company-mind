import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ReviewForm from '../src/components/ReviewForm';

storiesOf('ReviewForm', module)
  .add('default', () => (
    <ReviewForm onClick={action('onEmojiClick')} />
  ));
