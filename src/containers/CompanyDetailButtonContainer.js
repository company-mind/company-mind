import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyDetailButton from '../components/CompanyDetailButton';
import CompanyDetailOnButton from '../components/CompanyDetailOnButton';
import {
  dispatchCompanyDetailButton,
  dispatchCompanyDetailOnButton,
  dispatchCompanyDetailOffButton,
} from '../ducks/companyDetailButton';

class CompanyDetailButtonContainer extends Component {
  static defaultProps = {
    onMount: () => {},
    scrap: false,
  };

  componentDidMount() {
    this.props.onMount(this.props.match.params);
  }

  render() {
    const { onMount, scrap, ...rest } = this.props;
    if (scrap) {
      return <CompanyDetailOnButton {...rest} />;
    }
    return <CompanyDetailButton {...rest} />;
  }
}

export default connect(
  // mapStateToProps
  state => ({
    scrap: state.companyDetailButton.scrap,
  }),
  // mapDispatchToProps
  dispatch => ({
    onMount: ({ companyId }) => {
      dispatch(dispatchCompanyDetailButton({ companyId }));
    },
    onScrapClick: ({ companyId }) => {
      dispatch(dispatchCompanyDetailOnButton({ companyId }));
    },
    offScrapClick: ({ companyId }) => {
      dispatch(dispatchCompanyDetailOffButton({ companyId }));
    },
  }),
)(CompanyDetailButtonContainer);
