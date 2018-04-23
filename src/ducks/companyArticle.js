import * as firebase from 'firebase';

export const LOADING = 'companyDetail/LOADING';
export const SUCCESS = 'companyArticle/SUCCESS';

export function companyArticleLoading() {
  return {
    type: LOADING,
  };
}
export function companyArticleSuccess(companyItem) {
  return {
    type: SUCCESS,
    companyItem,
  };
}

const initialState = {
  companyItem: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        loading: true,
      };
    case SUCCESS:
      return {
        companyItem: action.companyItem,
        loading: false,
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

export const dispatchCompanyArticle = ({ companyId }) => async (dispatch) => {
  dispatch(companyArticleLoading());
  const snapshot = await firebase.database().ref(`company/${companyId}`).once('value');
  const companyObj = snapshot.val();
  const companyItem = {
    ...companyObj,
    emotionScore: emotion(companyObj.emotionScore),
    shortAddress: `${companyObj.address.split(' ')[1]}/${companyObj.address.split(' ')[2]}`,
  };
  dispatch(companyArticleSuccess(companyItem));
};
