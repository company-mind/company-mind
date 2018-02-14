import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyList from '../components/CompanyList';
import { fetchCompanyList } from '../ducks/companyList';
import withLoading from '../hocs/withLoading';

const LoadingcompanyList = withLoading(CompanyList)

class CompanyListContainer extends Component {
  static defaultProps = {
    onMount: () => { },
  }

  componentDidMount() {
    this.props.onMount();
  }
  render(){
    const { onMount, ...rest } = this.props;
    return(
      <LoadingcompanyList {...rest} />
    )
  }
}

export default connect (
  // mapStateToProps
  state => ({
    companies: state.companyList.companies,
    loading: state.companyList.loading,
  }),
  // mapDispatchToProps
  dispatch => ({
    onMount: () => {
      dispatch(fetchCompanyList())
    },
  }),
 )(CompanyListContainer);
