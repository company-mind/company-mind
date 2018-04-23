import * as firebase from 'firebase';

import { companyArticleSuccess } from './companyArticle';
// import { companyDetailSuccess } from './companyDetail';

export const LOADING = 'companyReviewList/LOADING';
export const READ = 'companyReviewList/READ';
export const SORTING = 'companyReviewList/SORTING';
export const SUCCESS = 'companyReviewList/SUCCESS';
export const VISIBLENESS = 'companyReviewList/VISIBLENESS';
export const INVISIBLENESS = 'companyReviewList/INVISIBLENESS';
export const USERVISIBLENESS = 'companyReviewList/USERVISIBLENESS';
export const USERINVISIBLENESS = 'companyReviewList/USERINVISIBLENESS';
export const DELETE = 'companyReviewList/DELETE';

export function companyReviewListLoading() {
  return {
    type: LOADING,
  };
}
export function companyReviewListRead() {
  return {
    type: READ,
  };
}
export function companyReviewListSorting(reviewSort) {
  return {
    type: SORTING,
    reviewSort,
  };
}
export function companyReviewListSuccess(reviewItem, pageNumber, activePage) {
  return {
    type: SUCCESS,
    reviewItem,
    pageNumber,
    activePage,
  };
}
export function companyReviewListVisibleness() {
  return {
    type: VISIBLENESS,
  };
}
export function companyReviewListInvisibleness() {
  return {
    type: INVISIBLENESS,
  };
}
export function companyReviewListUserVisibleness(reviewId, companyId) {
  return {
    type: USERVISIBLENESS,
    reviewId,
    companyId,
  };
}
export function companyReviewListUserInvisibleness() {
  return {
    type: USERINVISIBLENESS,
  };
}

export function companyReviewListDelete() {
  return {
    type: DELETE,
  };
}

const initialState = {
  loading: false,
  reviewSort: [],
  reviewItem: [],
  pageNumber: 0,
  isVisible: false,
  isUserVisible: false,
  delete: false,
  reviewId: [],
  companyId: [],
  activePage: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case READ:
      return {
        ...initialState,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SORTING:
      return {
        ...state,
        delet: false,
        reviewSort: action.reviewSort,
      };
    case SUCCESS:
      return {
        ...state,
        reviewItem: action.reviewItem,
        pageNumber: action.pageNumber,
        activePage: action.activePage,
        loading: false,
      };
    case USERVISIBLENESS:
      return {
        ...state,
        isUserVisible: true,
        isVisible: false,
        reviewId: action.reviewId,
        companyId: action.companyId,
      };
    case USERINVISIBLENESS:
      return {
        ...state,
        isUserVisible: false,
        reviewId: [],
        companyId: [],
      };
    case VISIBLENESS:
      return {
        ...state,
        isUserVisible: false,
        isVisible: true,
      };
    case INVISIBLENESS:
      return {
        ...state,
        isVisible: false,
      };
    case DELETE:
      return {
        ...state,
        delete: true,
        reviewId: [],
        companyId: [],
      };
    default:
      return state;
  }
}

const emotion = (score) => {
  if (score > 0 && score <= 1) {
    return '😡';
  } else if (score > 1 && score <= 2) {
    return '😭';
  } else if (score > 2 && score <= 3) {
    return '😄';
  } else if (score > 3 && score <= 4) {
    return '😍';
  }
  return '❔';
};

export const fetchCompanyReviewList = ({ match }) => async (dispatch) => {
  dispatch(companyReviewListRead());
  dispatch(companyReviewListLoading());
  const companyId = match.params.companyId;
  const snapshot = await firebase
    .database()
    .ref('reviews')
    .orderByChild('companyId')
    .equalTo(`${companyId}`)
    .once('value');
  const reviewObj = snapshot.val() || [];
  if (reviewObj) {
    const reviewSort = Object.entries(reviewObj).map(([reviewId, review]) => ({
      ...review,
      reviewId,
    }));
    const uidSet = new Set(reviewSort.map(reviewSort => reviewSort.uid));
    const uidObj = {};
    const nickPs = Array.from(uidSet).map(async (uid) => {
      const snapshot = await firebase
        .database()
        .ref(`users/${uid}/nickname`)
        .once('value');
      const nickname = snapshot.val();
      return [uid, nickname];
    });
    const nicknameArr = await Promise.all(nickPs);
    for (const [uid, nickname] of nicknameArr) {
      uidObj[uid] = nickname;
    }

    const reviewIdSet = new Set(reviewSort.map(reviewSort => reviewSort.reviewId));
    const likesReviewIdObj = {};
    const likePs = Array.from(reviewIdSet).map(async (reviewId) => {
      const snapshot = await firebase
        .database()
        .ref(`likesForReview/${reviewId}`)
        .once('value');
      const likesForReview = snapshot.val();
      return [reviewId, likesForReview];
    });
    const likesForReviewArr = await Promise.all(likePs);
    for (const [reviewId, likesForReview] of likesForReviewArr) {
      likesReviewIdObj[reviewId] = likesForReview;
    }

    const dislikesReviewIdObj = {};
    const dislikePs = Array.from(reviewIdSet).map(async (reviewId) => {
      const snapshot = await firebase
        .database()
        .ref(`dislikesForReview/${reviewId}`)
        .once('value');
      const dislikesForReview = snapshot.val();
      return [reviewId, dislikesForReview];
    });
    const dislikesForReviewArr = await Promise.all(dislikePs);
    for (const [reviewId, dislikesForReview] of dislikesForReviewArr) {
      dislikesReviewIdObj[reviewId] = dislikesForReview;
    }

    reviewSort.forEach((reviewSort) => {
      reviewSort.author = uidObj[reviewSort.uid];
      reviewSort.emotion = emotion(reviewSort.emotion);
      likesReviewIdObj[reviewSort.reviewId]
        ? (reviewSort.likesForReview = Object.keys(likesReviewIdObj[reviewSort.reviewId]))
        : (reviewSort.likesForReview = []);
      dislikesReviewIdObj[reviewSort.reviewId]
        ? (reviewSort.dislikesForReview = Object.keys(dislikesReviewIdObj[reviewSort.reviewId]))
        : (reviewSort.dislikesForReview = []);
    });
    dispatch(companyReviewListSorting(reviewSort));

    let pageNumber = Math.trunc(reviewSort.length / 6);
    if (reviewSort.length % 6) {
      pageNumber++;
    }

    const reviewItem = reviewSort.slice(0, 6);
    dispatch(companyReviewListSuccess(reviewItem, pageNumber, 1));
  }
};

export const fetPagination = ({ reviewSort, pageNumber }, activePage) => (dispatch) => {
  const reviewItem = reviewSort.slice(6 * (activePage - 1), 6 * activePage);
  dispatch(companyReviewListSuccess(reviewItem, pageNumber, activePage));
};

export const fetVisible = (reviewId, reviewuid, companyId) => (dispatch) => {
  const { uid } = firebase.auth().currentUser;
  if (uid === reviewuid) {
    dispatch(companyReviewListUserVisibleness(reviewId, companyId));
  } else {
    dispatch(companyReviewListVisibleness());
  }
};

export const fetUserInVisible = () => (dispatch) => {
  dispatch(companyReviewListUserInvisibleness());
};

export const fetInVisible = () => (dispatch) => {
  dispatch(companyReviewListInvisibleness());
};

export const fetReviewDelete = ({ reviewId, companyId }) => async (dispatch, getState) => {
  const reviewItemDelete = firebase
    .database()
    .ref(`reviews/${reviewId}`)
    .remove();
  const likesForReviewDelete = firebase
    .database()
    .ref(`likesForReview/${reviewId}`)
    .remove();
  const dislikesForReviewDelete = firebase
    .database()
    .ref(`dislikesForReview/${reviewId}`)
    .remove();
  await Promise.all([reviewItemDelete, likesForReviewDelete, dislikesForReviewDelete]);
  dispatch(companyReviewListDelete());

  const stateItem = getState();
  const reviewSort = stateItem.companyReviewList.reviewSort;
  const activePage = stateItem.companyReviewList.activePage;
  const companyItem = stateItem.companyArticle.companyItem;

  await firebase
    .database().ref(`company/${companyId}`)
    .update({
      reviewScore: companyItem.reviewScore - 1,
    });
  const companyUpdateItem = {
    ...companyItem,
    reviewScore: companyItem.reviewScore - 1,
  };
  dispatch(companyArticleSuccess(companyUpdateItem));

  for (let i = 0; i < reviewSort.length; i++) {
    if (reviewSort[i].reviewId === reviewId) {
      reviewSort.splice(i, 1);
    }
  }
  dispatch(companyReviewListSorting(reviewSort));

  let pageNumber = Math.trunc(reviewSort.length / 6);
  if (reviewSort.length % 6) {
    pageNumber++;
  }
  const reviewItem = reviewSort.slice(6 * (activePage - 1), 6 * activePage);
  dispatch(companyReviewListSuccess(reviewItem, pageNumber, activePage));
  dispatch(companyReviewListUserInvisibleness());
};

export const fetlikesForReview = (reviewid, { activePage }) => async (dispatch, getState) => {
  const { uid } = firebase.auth().currentUser;
  const snapshot3 = await firebase
    .database()
    .ref(`likesForReview/${reviewid}/${uid}`)
    .once('value');
  const likesForReviewUid = snapshot3.val();
  if (likesForReviewUid == null) {
    const snapshot = await firebase
      .database()
      .ref(`likesForReview/${reviewid}`)
      .update({
        [`${uid}`]: true,
      });
  } else if (likesForReviewUid) {
    const snapshot = await firebase
      .database()
      .ref(`likesForReview/${reviewid}/${uid}`)
      .remove();
  }
  const snapshot2 = await firebase
    .database()
    .ref(`likesForReview/${reviewid}`)
    .once('value');
  const likesForReview = snapshot2.val() || [];
  const stateItem = getState();
  const reviewSort = stateItem.companyReviewList.reviewSort;
  for (let i = 0; i < reviewSort.length; i++) {
    if (reviewSort[i].reviewId === reviewid) {
      reviewSort[i].likesForReview = Object.keys(likesForReview);
    }
  }
  dispatch(companyReviewListSorting(reviewSort));

  let pageNumber = Math.trunc(reviewSort.length / 6);
  if (pageNumber % 6) {
    pageNumber++;
  }
  const reviewItem = reviewSort.slice(6 * (activePage - 1), 6 * activePage);
  dispatch(companyReviewListSuccess(reviewItem, pageNumber, activePage));
};

export const fetDislikesForReview = (reviewid, { activePage }) => async (dispatch, getState) => {
  const { uid } = firebase.auth().currentUser;
  const snapshot3 = await firebase
    .database()
    .ref(`dislikesForReview/${reviewid}/${uid}`)
    .once('value');
  const dislikesForReviewUid = snapshot3.val();
  if (dislikesForReviewUid == null) {
    const snapshot = await firebase
      .database()
      .ref(`dislikesForReview/${reviewid}`)
      .update({
        [`${uid}`]: true,
      });
  } else if (dislikesForReviewUid) {
    const snapshot = await firebase
      .database()
      .ref(`dislikesForReview/${reviewid}/${uid}`)
      .remove();
  }
  const snapshot2 = await firebase
    .database()
    .ref(`dislikesForReview/${reviewid}`)
    .once('value');
  const dislikesForReview = snapshot2.val() || [];
  const stateItem = getState();
  const reviewSort = stateItem.companyReviewList.reviewSort;
  for (let i = 0; i < reviewSort.length; i++) {
    if (reviewSort[i].reviewId === reviewid) {
      reviewSort[i].dislikesForReview = Object.keys(dislikesForReview);
    }
  }
  dispatch(companyReviewListSorting(reviewSort));

  let pageNumber = Math.trunc(reviewSort.length / 6);
  if (reviewSort.length % 6) {
    pageNumber++;
  }
  const reviewItem = reviewSort.slice(6 * (activePage - 1), 6 * activePage);
  dispatch(companyReviewListSuccess(reviewItem, pageNumber, activePage));
};
