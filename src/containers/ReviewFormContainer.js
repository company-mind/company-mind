import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ReviewForm from '../components/ReviewForm';
import { createReview } from '../ducks/review';

class ReviewFormContainer extends Component {
  render() {
    const { success, ...rest } = this.props;
    if (success) {
      return (
        <Redirect to="/list" />
      );
    }
    return (
      <ReviewForm {...rest} />
    );
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
    onSubmit: ({ emotion, content }) => {
      dispatch(createReview({ emotion, content }));
    },
  }),
)(ReviewFormContainer);
