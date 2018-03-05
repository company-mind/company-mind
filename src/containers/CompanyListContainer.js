import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyList from '../components/CompanyList';
import { fetchCompanyList, fetchPagination } from '../ducks/companyList';
import withLoading from '../hocs/withLoading';

const LoadingcompanyList = withLoading(CompanyList);


class CompanyListContainer extends Component {
  static defaultProps = {
    onMount: () => { },
  }

  componentDidMount() {
    this.props.onMount()
  }

  render(){
    const { onMount, ...rest } = this.props;
    return(
      <LoadingcompanyList {...rest} onCompanyClick={this.handleCompanyClick}/>
    )
  }
}

export default connect (
  // mapStateToProps
  state => ({
    companyItems: state.companyList.companyItems,
    pageItems: state.companyList.pageItems,
    pageNumber: state.companyList.pageNumber,
  }),
  // mapDispatchToProps
  dispatch => ({
    onMount: () => {
      dispatch(fetchCompanyList())
    },
    onPaginationChange: ({ activePage }) => {
      dispatch(fetchPagination({ activePage }))
    },
  }),
 )(CompanyListContainer);
