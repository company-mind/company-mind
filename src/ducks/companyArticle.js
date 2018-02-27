import * as firebase from 'firebase';

export const SUCCESS = 'companyArticle/SUCCESS';

export function companyArticleSuccess(companyItem) {
  return {
    type: SUCCESS,
    companyItem,
  };
}

const initialState = {
  companyItem: [],
}

export default function (state = initialState, action) {
  switch(action.type){
    case SUCCESS:
      return{
        companyItem: action.companyItem,
      }
    default:
      return state;
  }
}

const emotion = (score) => {
  if(score > 0 && score <= 1){
    return '😡'
  } else if (score > 1 && score <= 2){
    return '😭'
  } else if (score > 2 && score <= 3){
    return '😄'
  } else if (score > 3 && score <= 4){
    return '😍'
  } else{
    return '❔'
  }
}

export const dispatchCompanyArticle = ({ companyId }) => async (dispatch) => {
  const snapshot = await firebase.database().ref(`company/${companyId}`).once('value');
  const companyObj = snapshot.val();
  const companyItem = {
    ...companyObj,
    emotionScore: emotion(companyObj.emotionScore),
    shortAddress: companyObj.address.split(' ')[1] + "/" + companyObj.address.split(' ')[2],
  }
  console.log(companyItem)
  dispatch(companyArticleSuccess(companyItem))
}
