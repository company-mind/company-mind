import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyReviewList from '../components/CompanyReviewList';
import {
  fetchCompanyReviewList,
  fetPagination,
  fetVisible,
  fetInVisible,
  fetReviewDelete,
  fetlikesForReview,
  fetUserInVisible,
  fetDislikesForReview,
} from '../ducks/companyReviewList';
// import withLoading from '../hocs/withLoading';

// const LoadingCompanyReviewList = withLoading(CompanyReviewList);

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
    loading: state.companyReviewList.loading,
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
      dispatch(fetchCompanyReviewList({ match }));
    },
    onPaginationChange: ({ reviewSort, pageNumber }, activePage) => {
      dispatch(fetPagination({ reviewSort, pageNumber }, activePage));
    },
    onReviewButtonClick: (reviewId, uid, companyId) => {
      dispatch(fetVisible(reviewId, uid, companyId));
    },
    onUserPrevButtonClick: () => {
      dispatch(fetUserInVisible());
    },
    onPrevButtonClick: () => {
      dispatch(fetInVisible());
    },
    onDeleteButtonClick: ({ reviewId, companyId }) => {
      dispatch(fetReviewDelete({ reviewId, companyId }));
    },
    onlikesForReviewClick: (reviewId, { activePage }) => {
      dispatch(fetlikesForReview(reviewId, { activePage }));
    },
    onDislikesForReviewClick: (reviewId, { activePage }) => {
      dispatch(fetDislikesForReview(reviewId, { activePage }));
    },
  }),
)(CompanyReviewListContainer);
