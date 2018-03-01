import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import CompanyReviewList from '../components/CompanyReviewList';
import { dispatchCompanyReviewList,
         dispatPagination,
         dispatVisible,
         dispatInVisible,
         dispatReviewDelete,
         dispatlikesForReview,
         dispatUserInVisible,
         dispatDislikesForReview,
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
<<<<<<< HEAD
    isVisible: state.companyReviewList.isVisible,
    isUserVisible: state.companyReviewList.isUserVisible,
    reviewId: state.companyReviewList.reviewId,
    companyId: state.companyReviewList.companyId,
    activePage: state.companyReviewList.activePage,
=======
>>>>>>> #9 companyReviewContainer, companyReviewList ducks 패턴 구현
  }),
  // mapDispatchToProps
  dispatch => ({
    onMount: ({ match }) => {
      dispatch(dispatchCompanyReviewList({ match }))
    },
<<<<<<< HEAD
    onPaginationChange: ({ reviewSort, pageNumber }, activePage) => {
      dispatch(dispatPagination({ reviewSort, pageNumber }, activePage))
    },
    onReviewButtonClick: (reviewId, uid, companyId) => {
      dispatch(dispatVisible(reviewId, uid, companyId))
    },
    onUserPrevButtonClick: () => {
      dispatch(dispatUserInVisible())
    },
    onPrevButtonClick: () => {
      dispatch(dispatInVisible())
    },
    onDeleteButtonClick: ({ reviewId, companyId }) => {
      dispatch(dispatReviewDelete({ reviewId, companyId }))
    },
    onlikesForReviewClick: ( reviewId, {activePage} ) => {
      dispatch(dispatlikesForReview( reviewId, {activePage} ))
    },
    onDislikesForReviewClick: ( reviewId, {activePage} ) => {
      dispatch(dispatDislikesForReview( reviewId, {activePage} ))
=======
    onChange: ({ reviewSort, pageNumber }, activePage) => {
      dispatch(dispatPaginationChange({ reviewSort, pageNumber }, activePage))
>>>>>>> #9 companyReviewContainer, companyReviewList ducks 패턴 구현
    },
  }),
)(CompanyReviewListContainer)
