import * as firebase from 'firebase';

import { companyArticleSuccess } from './companyArticle';

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
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ONSCRAP:
      return {
        scrap: true,
      };
    case OFFSCRAP:
      return {
        scrap: false,
      };
    default:
      return state;
  }
}

export const dispatchCompanyDetailButton = ({ companyId }) => async (dispatch) => {
  const { uid } = firebase.auth().currentUser;
  const snapshot = await firebase.database().ref(`scraps/${uid}`).once('value');
  const companyObj = snapshot.val();
  if (companyObj[companyId]) {
    dispatch(companyDetailOnScrap());
  } else {
    dispatch(companyDetailOffScrap());
  }
};

export const dispatchCompanyDetailOnButton = ({ companyId }) => async (dispatch, gestate) => {
  const { uid } = firebase.auth().currentUser;
  const stateItem = gestate();
  const companyItem = stateItem.companyArticle.companyItem;
  const scrap = firebase.database().ref(`scraps/${uid}`).update({
    [`${companyId}`]: true,
  });
  const scrapScore = firebase.database().ref(`company/${companyId}`).update({
    scrapScore: companyItem.scrapScore + 1,
  });
  await Promise.all([scrap, scrapScore]);
  const companyUpdateItem = {
    ...companyItem,
    scrapScore : companyItem.scrapScore + 1,
  };
  dispatch(companyArticleSuccess(companyUpdateItem));
  dispatch(companyDetailOnScrap());
};

export const dispatchCompanyDetailOffButton = ({ companyId }) => async (dispatch, gestate) => {
  const { uid } = firebase.auth().currentUser;
  const stateItem = gestate();
  const companyItem = stateItem.companyArticle.companyItem;
  const scrap = firebase.database().ref(`scraps/${uid}/${companyId}`).remove();
  const scrapScore = firebase.database().ref(`company/${companyId}`).update({
    scrapScore: companyItem.scrapScore - 1,
  });
  await Promise.all([scrap, scrapScore]);
  const companyUpdateItem = {
    ...companyItem,
    scrapScore: companyItem.scrapScore - 1,
  };
  dispatch(companyArticleSuccess(companyUpdateItem));
  dispatch(companyDetailOffScrap());
};
