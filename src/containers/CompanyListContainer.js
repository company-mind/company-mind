import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'semantic-ui-react'

import CompanyList from '../components/CompanyList';
import { fetchCompanyList, fetchPagination, fetchSearch, fetchResultSelect } from '../ducks/companyList';
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
    const resultRenderer = ({ name }) => <Label content={name} />
    return(
      <LoadingcompanyList {...rest} onCompanyClick={this.handleCompanyClick} resultRenderer={resultRenderer}/>
    )
  }
}

export default connect (
  // mapStateToProps
  state => ({
    loading: state.companyList.loading,
    searchLoading: state.companyList.searchLoading,
    value: state.companyList.value,
    companyItems: state.companyList.companyItems,
    results: state.companyList.results,
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
    onSearchChange: ({ value }) => {
      dispatch(fetchSearch({ value }))
    },
    onResultSelect: ({ result }) => {
      dispatch(fetchResultSelect({ result }))
    },
  }),
 )(CompanyListContainer);
