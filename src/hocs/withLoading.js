import React, { Component } from 'react';

import { Dimmer, Loader } from 'semantic-ui-react';

export default function withLoading(WrappedComponent) {
  return class extends Component {
    render() {
      if (this.props.loading) {
        return (
          <Dimmer active inverted>
            <Loader />Loading
          </Dimmer>
        );
      }
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}
