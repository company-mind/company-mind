import * as firebase from 'firebase';

export const SORTING = 'companyReviewList/SORTING';
export const SUCCESS = 'companyReviewList/SUCCESS';
export const VISIBLENESS = 'companyReviewList/VISIBLENESS'
export const INVISIBLENESS = 'companyReviewList/INVISIBLENESS'
export const USERVISIBLENESS = 'companyReviewList/USERVISIBLENESS'
export const USERINVISIBLENESS = 'companyReviewList/USERINVISIBLENESS'
export const DELETE = 'companyReviewList/DELETE'

export function companyReviewListSorting(reviewSort) {
  return {
    type: SORTING,
    reviewSort,
  };
}
export function companyReviewListSuccess(reviewItem, pageNumber) {
  return {
    type: SUCCESS,
    reviewItem,
    pageNumber,
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
  reviewSort: [],
  reviewItem: [],
  pageNumber: 0,
  isVisible: false,
  isUserVisible: false,
  delete: false,
  reviewId: [],
  companyId: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SORTING:
      return {
        ...state,
        delet: false,
        reviewSort: action.reviewSort,
      }
    case SUCCESS:
      return {
        ...state,
        reviewItem: action.reviewItem,
        pageNumber: action.pageNumber,
      }
    case USERVISIBLENESS:
      return {
        ...state,
        isUserVisible: true,
        isVisible: false,
        reviewId: action.reviewId,
        companyId: action.companyId,
      }
    case USERINVISIBLENESS:
      return {
        ...state,
        isUserVisible: false,
        reviewId: [],
        companyId: [],
      }
    case VISIBLENESS:
      return {
        ...state,
        isUserVisible: false,
        isVisible: true,
      }
    case INVISIBLENESS:
      return {
        ...state,
        isVisible: false,
      }
    case DELETE:
      return {
        ...state,
        delete: true,
        reviewId: [],
        companyId: [],
      }
    default:
      return state;
  }
}

const emotion = (score) => {
  if (score > 0 && score <= 1) {
    return '😡'
  } else if (score > 1 && score <= 2) {
    return '😭'
  } else if (score > 2 && score <= 3) {
    return '😄'
  } else if (score > 3 && score <= 4) {
    return '😍'
  } else {
    return '❔'
  }
}

export const dispatchCompanyReviewList = ({match}) => async (dispatch) => {
  const companyId = match.params.companyId
  const snapshot = await firebase.database().ref('reviews').orderByChild('companyId').equalTo(`${companyId}`).once('value');
  const reviewObj = snapshot.val();
  if (reviewObj){
    const reviewSort = Object.entries(reviewObj).map(([reviewId, review]) => ({
      ...review,
      reviewId,
    }))
    const uidSet = new Set(reviewSort.map(reviewSort => reviewSort.uid))
    const uidObj = {}
    const nickPs = Array.from(uidSet).map(async uid => {
      const snapshot = await firebase.database().ref(`users/${uid}/nickname`).once('value')
      const nickname = snapshot.val();
      return [uid, nickname]
    })
    const nicknameArr = await Promise.all(nickPs)
    for (const [uid, nickname] of nicknameArr) {
      uidObj[uid] = nickname
    }

    const reviewIdSet = new Set(reviewSort.map(reviewSort => reviewSort.reviewId))
    const likesReviewIdObj = {}
    const likePs = Array.from(reviewIdSet).map(async reviewId => {
      const snapshot = await firebase.database().ref(`likesForReview/${reviewId}`).once('value')
      const likesForReview = snapshot.val();
      return [reviewId, likesForReview]
    })
    const likesForReviewArr = await Promise.all(likePs)
    for (const [reviewId, likesForReview] of likesForReviewArr) {
      likesReviewIdObj[reviewId] = likesForReview
    }

    const dislikesReviewIdObj = {}
    const dislikePs = Array.from(reviewIdSet).map(async reviewId => {
      const snapshot = await firebase.database().ref(`dislikesForReview/${reviewId}`).once('value')
      const dislikesForReview = snapshot.val();
      return [reviewId, dislikesForReview]
    })
    const dislikesForReviewArr = await Promise.all(dislikePs)
    for (const [reviewId, dislikesForReview] of dislikesForReviewArr) {
      dislikesReviewIdObj[reviewId] = dislikesForReview
    }

    reviewSort.forEach(reviewSort => {
      reviewSort.author = uidObj[reviewSort.uid];
      reviewSort.emotion = emotion(reviewSort.emotion)
      likesReviewIdObj[reviewSort.reviewId] ?
      reviewSort.likesForReview = Object.keys(likesReviewIdObj[reviewSort.reviewId]) :
      reviewSort.likesForReview = []
      dislikesReviewIdObj[reviewSort.reviewId] ?
      reviewSort.dislikesForReview = Object.keys(dislikesReviewIdObj[reviewSort.reviewId]) :
      reviewSort.dislikesForReview = []
    })

    dispatch(companyReviewListSorting(reviewSort))

    let pageNumber = Math.trunc(reviewSort.length / 6);
    if(pageNumber % 6){
      pageNumber++
    }

    const reviewItem = reviewSort.slice(0, 6)
    dispatch(companyReviewListSuccess(reviewItem, pageNumber))
  }
}

export const dispatPagination = ({ reviewSort, pageNumber }, activePage) => (dispatch) => {
  const reviewItem = reviewSort.slice((6 * (activePage - 1)), (6 * activePage))
  dispatch(companyReviewListSuccess(reviewItem, pageNumber))
}

export const dispatVisible = (reviewId, reviewuid, companyId) => (dispatch) => {
  const { uid } = firebase.auth().currentUser;
  console.log(reviewuid, uid, uid === reviewuid)
  if (uid === reviewuid){
    dispatch(companyReviewListUserVisibleness(reviewId, companyId))
  } else {
    dispatch(companyReviewListVisibleness())
  }
}

export const dispatUserInVisible = () => (dispatch) => {
  dispatch(companyReviewListUserInvisibleness())
}

export const dispatInVisible = () => (dispatch) => {
  dispatch(companyReviewListInvisibleness())
}

export const dispatReviewDelete = ({ reviewId, companyId }) => async (dispatch) => {
  const reviewItemDelete = firebase.database().ref(`reviews/${reviewId}`).remove()
  const likesForReviewDelete = firebase.database().ref(`likesForReview/${reviewId}`).remove()
  const dislikesForReviewDelete = firebase.database().ref(`dislikesForReview/${reviewId}`).remove()
  await Promise.all([reviewItemDelete, likesForReviewDelete, dislikesForReviewDelete]);
  dispatch(companyReviewListDelete())

  const snapshot = await firebase.database().ref('reviews').orderByChild('companyId').equalTo(`${companyId}`).once('value');
  const reviewObj = snapshot.val();
  const reviewSort = Object.entries(reviewObj).map(([reviewId, review]) => ({
    ...review,
    reviewId,
  }))
  const uidSet = new Set(reviewSort.map(reviewSort => reviewSort.uid))
  const uidObj = {}
  const nickPs = Array.from(uidSet).map(async uid => {
    const snapshot = await firebase.database().ref(`users/${uid}/nickname`).once('value')
    const nickname = snapshot.val();
    return [uid, nickname]
  })
  const nicknameArr = await Promise.all(nickPs)
  for (const [uid, nickname] of nicknameArr) {
    uidObj[uid] = nickname
  }

  const reviewIdSet = new Set(reviewSort.map(reviewSort => reviewSort.reviewId))
  const likesReviewIdObj = {}
  const likePs = Array.from(reviewIdSet).map(async reviewId => {
    const snapshot = await firebase.database().ref(`likesForReview/${reviewId}`).once('value')
    const likesForReview = snapshot.val();
    return [reviewId, likesForReview]
  })
  const likesForReviewArr = await Promise.all(likePs)
  for (const [reviewId, likesForReview] of likesForReviewArr) {
    likesReviewIdObj[reviewId] = likesForReview
  }

  const dislikesReviewIdObj = {}
  const dislikePs = Array.from(reviewIdSet).map(async reviewId => {
    const snapshot = await firebase.database().ref(`dislikesForReview/${reviewId}`).once('value')
    const dislikesForReview = snapshot.val();
    return [reviewId, dislikesForReview]
  })
  const dislikesForReviewArr = await Promise.all(dislikePs)
  for (const [reviewId, dislikesForReview] of dislikesForReviewArr) {
    dislikesReviewIdObj[reviewId] = dislikesForReview
  }

  reviewSort.forEach(reviewSort => {
    reviewSort.author = uidObj[reviewSort.uid];
    reviewSort.emotion = emotion(reviewSort.emotion)
    likesReviewIdObj[reviewSort.reviewId] ?
      reviewSort.likesForReview = Object.keys(likesReviewIdObj[reviewSort.reviewId]) :
      reviewSort.likesForReview = []
    dislikesReviewIdObj[reviewSort.reviewId] ?
      reviewSort.dislikesForReview = Object.keys(dislikesReviewIdObj[reviewSort.reviewId]) :
      reviewSort.dislikesForReview = []
  })
  dispatch(companyReviewListSorting(reviewSort))
  dispatch(companyReviewListUserInvisibleness())
  let pageNumber = Math.trunc(reviewSort.length / 6);
  if (pageNumber % 6) {
    pageNumber++
  }

  const reviewItem = reviewSort.slice(0, 6)
  dispatch(companyReviewListSuccess(reviewItem, pageNumber))
}

export const dispatlikesForReview = (reviewId) => (dispatch) => {
  dispatch(companyReviewListInvisibleness())
}
