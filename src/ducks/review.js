/* reducer structure
{
  creating: false,
  success: false,
  errorMessage: '',
}
*/
import * as firebase from 'firebase';

// actions
export const CREATING = 'review/CREATING';
export const SUCCESS = 'review/SUCCESS';
export const INITIAL = 'review/INITIAL';
export const ERROR = 'review/ERROR';

export function reviewCreating() {
  return {
    type: CREATING,
  };
}

export function reviewSuccess() {
  return {
    type: SUCCESS,
  };
}

export function reviewInitial() {
  return {
    type: INITIAL,
  };
}

export function reviewError(errorMessage) {
  return {
    type: ERROR,
    errorMessage,
  };
}

// reducer
const initialState = {
  creating: false,
  success: false,
  errorMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATING:
      return {
        creating: true,
        success: false,
        errorMessage: '',
      };
    case SUCCESS:
      return {
        creating: false,
        success: true,
        errorMessage: '',
      };
    case INITIAL:
      return initialState;
    case ERROR:
      return {
        creating: false,
        success: false,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
}

// thunk
export const createReview = ({
  companyId, writer, emotion, content,
}) => async (dispatch) => {
  // error handling
  if (!emotion) {
    dispatch(reviewError('이모지는 반드시 선택하셔야 합니다.'));
    return;
  }

  // verify user
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    return;
  }

  // dispatch state to reducer
  dispatch(reviewCreating());
  try {
    await firebase
      .database()
      .ref('reviews')
      .push({
        uid: currentUser.uid,
        companyId,
        time: firebase.database.ServerValue.TIMESTAMP,
        writer,
        emotion,
        content,
      });
    const currentCompanySnapshot = await firebase
      .database()
      .ref(`company/${companyId}`)
      .once('value');
    const currentCompanyObj = currentCompanySnapshot.val();
    const { reviewScore, emotionScore } = currentCompanyObj;
    await firebase
      .database()
      .ref(`company/${companyId}`)
      .update({
        reviewScore: reviewScore + 1,
        emotionScore: (emotionScore * reviewScore + emotion) / (reviewScore + 1),
      });
    dispatch(reviewSuccess());
    dispatch(reviewInitial());
  } catch (e) {
    dispatch(reviewError(`알 수 없는 에러가 발생했습니다. 다시 시도해 주세요: ${e.message}`));
  }
};
