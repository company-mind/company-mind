import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createReview } from '../ducks/review';

import ReviewForm from '../components/ReviewForm';
// import CompanyArticleContainer from '../containers/CompanyArticleContainer';
// import CompanyDetailButtonContainer from '../containers/CompanyDetailButtonContainer';
// import CompanyReviewListContainer from '../containers/CompanyReviewListContainer';

class ReviewFormContainer extends Component {
  render() {
    const { companyId } = this.props.match.params;
    const { success, ...rest } = this.props;
    if (success) {
      return <Redirect to={`/companyDetail/${companyId}`} />;
    }
    return <ReviewForm {...rest} />;
  }
}

export default connect(
  // mapStateToProps
  state => ({
    creating: state.review.creating,
    success: state.review.success,
    errorMessage: state.review.errorMessage,
  }),
  // mapDispatchToProps
  dispatch => ({
    onSubmit: ({
      companyId, writer, emotion, content,
    }) => {
      dispatch(createReview({
        companyId,
        writer,
        emotion,
        content,
      }));
    },
  }),
)(ReviewFormContainer);
