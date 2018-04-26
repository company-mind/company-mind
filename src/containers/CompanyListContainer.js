import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyList from '../components/CompanyList';
import TopMenuContainer from './TopMenuContainer';
import { fetchCompanyList, fetchPagination, fetchSearch, fetchResultSelect } from '../ducks/companyList';
import withLoading from '../hocs/withLoading';

const LoadingcompanyList = withLoading(CompanyList);


class CompanyListContainer extends Component {
  static defaultProps = {
    onMount: () => { },
  }

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { onMount, ...rest } = this.props;
    return (
      <div>
        <TopMenuContainer {...rest} />
        <LoadingcompanyList {...rest} onCompanyClick={this.handleCompanyClick} />
      </div>
    );
  }
}

export default connect(
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
      dispatch(fetchCompanyList());
    },
    onPaginationChange: ({ activePage }) => {
      dispatch(fetchPagination({ activePage }));
    },
    onSearchChange: ({ value }) => {
      dispatch(fetchSearch({ value }));
    },
    onResultSelect: ({ result }) => {
      dispatch(fetchResultSelect({ result }));
    },
  }),
)(CompanyListContainer);
