import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompanyDetailButton from '../components/CompanyDetailButton';
import CompanyDetailOnButton from '../components/CompanyDetailOnButton';

import { dispatchCompanyDetailButton } from '../ducks/companyDetailButton';



class CompanyDetailButtonContainer extends Component{
  static defaultProps = {
    onMount: () => { },
    scrap: false,
  }

  componentDidMount() {
    this.props.onMount(this.props.match.params)
  }

  render() {
    const { onMount, scrap, ...rest } = this.props;
    console.log(rest)
    if(scrap){
      return(
        <CompanyDetailOnButton {...rest}/>
      )
    } else {
      return(
        <CompanyDetailButton {...rest} />
      )
    }
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
      dispatch(dispatchCompanyDetailButton({ companyId }))
    }
  }),
)(CompanyDetailButtonContainer)
