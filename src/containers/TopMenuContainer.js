import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopMenu from '../components/TopMenu';
import { dispatchTopMenu } from '../ducks/topMenu';

class TopMenuContainer extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <TopMenu {...rest} />
    );
  }
}

export default connect(
  // mapStateToProps
  state => ({
    logOut: state.topMenu.logOut,
  }),
  // mapDispatchToProps
  dispatch => ({
    onLogOutClick: (name) => {
      dispatch(dispatchTopMenu(name));
    },
    onActiveItemClick: (name) => {
      dispatch(dispatchTopMenu(name));
    },
  }),
)(TopMenuContainer);
