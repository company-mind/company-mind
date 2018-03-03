import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyReviewList from '../components/CompanyReviewList';
import { dispatchCompanyReviewList,
         dispatPagination,
         dispatVisible,
         dispatInVisible,
         dispatReviewDelete,
         dispatlikesForReview,
        } from '../ducks/companyReviewList';

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
    isVisible: state.companyReviewList.isVisible,
    reviewId: state.companyReviewList.reviewId,
    companyId: state.companyReviewList.companyId,
  }),
  // mapDispatchToProps
  dispatch => ({
    onMount: ({ match }) => {
      dispatch(dispatchCompanyReviewList({ match }))
    },
    onPaginationChange: ({ reviewSort, pageNumber }, activePage) => {
      dispatch(dispatPagination({ reviewSort, pageNumber }, activePage))
    },
    onReviewButtonClick: (reviewId, uid, companyId) => {
      dispatch(dispatVisible(reviewId, uid, companyId))
    },
    onPrevButtonClick: () => {
      dispatch(dispatInVisible())
    },
    onDeleteButtonClick: ({ reviewId, companyId }) => {
      dispatch(dispatReviewDelete({ reviewId, companyId }))
    },
    onlikesForReviewClick: ( reviewId ) => {
      dispatch(dispatlikesForReview( reviewId ))
    },
  }),
)(CompanyReviewListContainer)
