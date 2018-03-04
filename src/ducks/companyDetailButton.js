import * as firebase from 'firebase';

export const ONSCRAP = 'companyDetailButton/ONSCRAP';
export const OFFSCRAP = 'companyDetailButton/OFFSCRAP';

export function companyDetailOnScrap() {
  return {
    type: ONSCRAP,
  };
}

export function companyDetailOffScrap() {
  return {
    type: OFFSCRAP,
  };
}

const initialState = {
  scrap: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ONSCRAP:
      return {
        scrap: true,
      }
    case OFFSCRAP:
      return {
        scrap: false,
      }
    default:
      return state;
  }
}

export const dispatchCompanyDetailButton = ({ companyId }) => async (dispatch) => {
  const { uid } = firebase.auth().currentUser;
  const snapshot = await firebase.database().ref(`scraps/${uid}`).once('value');
  const companyObj = snapshot.val();
  if(companyObj[companyId]){
    dispatch(companyDetailOnScrap())
  } else {
    dispatch(companyDetailOffScrap())
  }
}

export const dispatchCompanyDetailOnButton = ({ companyId }) => async (dispatch) => {
  const { uid } = firebase.auth().currentUser;
  const snapshot = await firebase.database().ref(`scraps/${uid}`).update({
    [`${companyId}`]: true,
  });
    dispatch(companyDetailOnScrap())
}

export const dispatchCompanyDetailOffButton = ({ companyId }) => async (dispatch) => {
  const { uid } = firebase.auth().currentUser;
  const snapshot = await firebase.database().ref(`scraps/${uid}/${companyId}`).remove();
    dispatch(companyDetailOffScrap())
}
