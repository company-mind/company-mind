import React, { Component } from 'react';

import { Grid, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const FullHeightGrid = styled(Grid) `
  height: 100vh;
`;

export default function withLoading(WrappedComponent) {
  return class extends Component {
    render() {
      if (this.props.loading) {
        return (
          <FullHeightGrid centered verticalAlign="middle">
            <Grid.Column style={{ width: '100px' }}>
              <Icon loading name='spinner' size='huge' color='black' />
            </Grid.Column>
          </FullHeightGrid>
        );
      }
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}
