import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopMenu from '../components/TopMenu';
import { dispatchTopMenu, dispatchTopMenuLogOut, dispatchTopMenuRead } from '../ducks/topMenu';

class TopMenuContainer extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { onMount, ...rest } = this.props;
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
    onMount: () => {
      dispatch(dispatchTopMenuRead());
    },
    onLogOutClick: (e, { name }) => {
      dispatch(dispatchTopMenuLogOut(e, { name }));
    },
    onActiveItemClick: (name) => {
      dispatch(dispatchTopMenu(name));
    },
  }),
)(TopMenuContainer);
