import React, { Component, Fragment } from 'react';
import * as firebase from 'firebase';

import withAuth from '../hocs/withAuth';

import TopMenuContainer from '../containers/TopMenuContainer';
import MyPageHeader from '../components/MyPageHeader';
import MyReviewList from '../components/MyReviewList';
import MyScrapList from '../components/MyScrapList';

class MyPageContainer extends Component {
  state = {
    userInfo: {},
    userReviews: [],
    userScraps: [],
    isReviewMode: true,
  };

  componentDidMount() {
    this.getUserInfo();
    this.getUserReviews();
    this.getUserScraps();
  }

  getUserInfo = async () => {
    const { uid } = await firebase.auth().currentUser;
    const userSnapshot = await firebase
      .database()
      .ref(`users/${uid}`)
      .once('value');
    const userInfo = userSnapshot.val();
    this.setState({ userInfo });
  };

  getUserReviews = async () => {
    const { uid } = await firebase.auth().currentUser;
    const reviewsSnapshot = await firebase
      .database()
      .ref('reviews')
      .orderByChild('uid')
      .equalTo(uid)
      .once('value');
    const reviewsResults = reviewsSnapshot.val();
    if (reviewsResults) {
      const reviewIds = Object.keys(reviewsResults);
      const pendingReviews = reviewIds.map(async (reviewId) => {
        const companyIdSnapshot = await firebase
          .database()
          .ref(`reviews/${reviewId}/companyId`)
          .once('value');
        const companyId = companyIdSnapshot.val();
        const companyNameSnapshot = await firebase
          .database()
          .ref(`company/${companyId}/name`)
          .once('value');
        const companyName = companyNameSnapshot.val();
        const reviewSnapshot = await firebase
          .database()
          .ref(`reviews/${reviewId}`)
          .once('value');
        const review = reviewSnapshot.val();
        return {
          companyName,
          reviewId,
          ...review,
        };
      });
      const userReviews = await Promise.all(pendingReviews);
      this.setState({ userReviews });
    }
  };

  getUserScraps = async () => {
    const { uid } = await firebase.auth().currentUser;
    const scrapsSnapshot = await firebase
      .database()
      .ref(`scraps/${uid}`)
      .once('value');
    const scraps = scrapsSnapshot.val();
    if (scraps) {
      const scrappedCompanyIds = Object.keys(scraps);
      const pendingScraps = scrappedCompanyIds.map(async (companyId) => {
        const companyListSnapshot = await firebase
          .database()
          .ref(`company/${companyId}`)
          .once('value');
        const companyList = companyListSnapshot.val();
        return { companyId, ...companyList };
      });
      const userScraps = await Promise.all(pendingScraps);
      this.setState({ userScraps });
    }
  };

  handleReviewButtonClick = () => {
    this.setState({ isReviewMode: true });
  };

  handleScrapButtonClick = () => {
    this.setState({ isReviewMode: false });
  };

  render() {
    return (
      <Fragment>
        <TopMenuContainer />
        <MyPageHeader
          handleReviewButtonClick={this.handleReviewButtonClick}
          handleScrapButtonClick={this.handleScrapButtonClick}
          nickname={this.state.userInfo.nickname}
          isReviewMode={this.state.isReviewMode}
        />
        {this.state.isReviewMode ? (
          <MyReviewList myReviews={this.state.userReviews} />
        ) : (
          <MyScrapList myScraps={this.state.userScraps} />
        )}
      </Fragment>
    );
  }
}

export default withAuth(MyPageContainer);
