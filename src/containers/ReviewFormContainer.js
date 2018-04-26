import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createReview } from '../ducks/review';

import ReviewForm from '../components/ReviewForm';
import CompanyArticleContainer from '../containers/CompanyArticleContainer';
import CompanyReviewListContainer from '../containers/CompanyReviewListContainer';
import TopMenuContainer from '../containers/TopMenuContainer'

class ReviewFormContainer extends Component {
  render() {
    const { companyId } = this.props.match.params;
    const { success, ...rest } = this.props;
    if (success) {
      return <Redirect to={`/companydetail/${companyId}`} />;
    }
    return (
      <Fragment>
        <TopMenuContainer />
        <CompanyArticleContainer {...rest} />
        <ReviewForm {...rest} />
        <CompanyReviewListContainer {...rest} />
      </Fragment>
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
