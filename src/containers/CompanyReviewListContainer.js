import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import CompanyReviewList from '../components/CompanyReviewList';
import {
  dispatchCompanyReviewList,
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
    this.props.onMount(this.props);
  }

  render() {
    const { onMount, ...rest } = this.props;
    return <CompanyReviewList {...rest} />;
  }
}

export default connect(
  // mapStateToProps
  state => ({
    reviewSort: state.companyReviewList.reviewSort,
    reviewItem: state.companyReviewList.reviewItem,
    pageNumber: state.companyReviewList.pageNumber,
    isVisible: state.companyReviewList.isVisible,
    isUserVisible: state.companyReviewList.isUserVisible,
    reviewId: state.companyReviewList.reviewId,
    companyId: state.companyReviewList.companyId,
    activePage: state.companyReviewList.activePage,
  }),
  // mapDispatchToProps
  dispatch => ({
    onMount: ({ match }) => {
      dispatch(dispatchCompanyReviewList({ match }));
    },
    onPaginationChange: ({ reviewSort, pageNumber }, activePage) => {
      dispatch(dispatPagination({ reviewSort, pageNumber }, activePage));
    },
    onReviewButtonClick: (reviewId, uid, companyId) => {
      dispatch(dispatVisible(reviewId, uid, companyId));
    },
    onUserPrevButtonClick: () => {
      dispatch(dispatUserInVisible());
    },
    onPrevButtonClick: () => {
      dispatch(dispatInVisible());
    },
    onDeleteButtonClick: ({ reviewId, companyId }) => {
      dispatch(dispatReviewDelete({ reviewId, companyId }));
    },
    onlikesForReviewClick: (reviewId, { activePage }) => {
      dispatch(dispatlikesForReview(reviewId, { activePage }));
    },
    onDislikesForReviewClick: (reviewId, { activePage }) => {
      dispatch(dispatDislikesForReview(reviewId, { activePage }));
    },
  }),
)(CompanyReviewListContainer);
