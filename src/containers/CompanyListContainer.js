import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CompanyList from '../components/CompanyList';
import { fetchCompanyList, fetchCompanyRedirect } from '../ducks/companyList';
import withLoading from '../hocs/withLoading';

const LoadingcompanyList = withLoading(CompanyList)

class CompanyListContainer extends Component {
  static defaultProps = {
    onMount: () => { },
  }

  componentDidMount() {
    this.props.onMount();
  }

  handleCompanyClick = id => {
    this.props.onCompanyClick(id)
  }

  render(){
    const { onMount, redirect, company, ...rest } = this.props;
    console.log(company)
    if(redirect){
      return (
      <Redirect to="/detail" {...company}/>
      )
    }
    return(
      <LoadingcompanyList {...rest} onCompanyClick={this.handleCompanyClick}/>
    )
  }
}

export default connect (
  // mapStateToProps
  state => ({
    companies: state.companyList.companies,
    company: state.companyList.company,
    loading: state.companyList.loading,
    redirect: state.companyList.redirect,
  }),
  // mapDispatchToProps
  dispatch => ({
    onMount: () => {
      dispatch(fetchCompanyList())
    },
    onCompanyClick: (id) => {
      dispatch(fetchCompanyRedirect(id));
    },
  }),
 )(CompanyListContainer);
