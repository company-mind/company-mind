import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyList from '../components/CompanyList';
import { fetchCompanyList, fetchOnCompanyList } from '../ducks/companyList';
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
    companies: state.companyList.companies,
    hasmore: state.companyList.hasmore,
    complete: state.companyList.complete,
    completeList: state.companyList.completeList,
  }),
  // mapDispatchToProps
  dispatch => ({
    onMount: () => {
      dispatch(fetchCompanyList())
    },
    onHasMore: ({ complete, hasmore }) => {
      dispatch(fetchOnCompanyList({ complete, hasmore }))
    },
  }),
 )(CompanyListContainer);
