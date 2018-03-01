import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyReviewList from '../components/CompanyReviewList';
import { dispatchCompanyReviewList, dispatPaginationChange } from '../ducks/companyReviewList';

class CompanyReviewListContainer extends Component {

  componentDidMount() {
    this.props.onMount(this.props)
  }

  render(){
    const { onMount, ...rest } = this.props;
    return(
      <CompanyReviewList {...rest} />
    )
  }
}

export default connect(
  // mapStateToProps
  state => ({
    reviewSort: state.companyReviewList.reviewSort,
    reviewItem: state.companyReviewList.reviewItem,
    pageNumber: state.companyReviewList.pageNumber,
  }),
  // mapDispatchToProps
  dispatch => ({
    onMount: ({ match }) => {
      dispatch(dispatchCompanyReviewList({ match }))
    },
    onChange: ({ reviewSort, pageNumber }, activePage) => {
      dispatch(dispatPaginationChange({ reviewSort, pageNumber }, activePage))
    },
  }),
)(CompanyReviewListContainer)
