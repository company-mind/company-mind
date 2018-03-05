import * as firebase from 'firebase';

export const SUCCESS = 'companyList/SUCCESS';
export const PAGINATION = 'companyList/PAGINATION';

export function companyListPagination(pageItems, pageNumber) {
  return {
    type: PAGINATION,
    pageItems,
    pageNumber,
  };
}

export function companyListSuccess(companyItems) {
  return {
    type: SUCCESS,
    companyItems,
  };
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

const initialState = {
  companyItems: [],
  pageItems: [],
  pageNumber: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
      case SUCCESS:
      return {
        ...state,
        companyItems: action.companyItems,
      };
      case PAGINATION:
      return {
        ...state,
        pageItems: action.pageItems,
        pageNumber: action.pageNumber,
      };
    default:
      return state;
  }
}


export const fetchCompanyList = () => async (dispatch) => {
  const snapshot = await firebase.database().ref('company').once('value');
  const companyObj = snapshot.val();
  const companies = Object.entries(companyObj).map(([id, company]) => ({
    ...company,
    id
  }));
  const newCompanies = companies.map(({ address, emotionScore, ...rest }) => ({
    ...rest,
    address: address.split(' ')[1] + "/" + address.split(' ')[2],
    emotionScore: emotion(emotionScore)
  }));
  const scrapSort = newCompanies.sort((x, y) => x.scrapScore - y.scrapScore)
  const reviewSort = scrapSort.sort((x, y) => y.reviewScore - x.reviewScore)
  dispatch(companyListSuccess(reviewSort))
  let pageNumber = Math.trunc(reviewSort.length / 8);
  if (pageNumber % 8) {
    pageNumber++
  }
  const pageItems = reviewSort.slice(0, 8)
  dispatch(companyListPagination(pageItems, pageNumber))
}

export const fetchPagination = ({ activePage }) => async (dispatch, getState) => {
  const stateItems = getState()
  const companyItems = stateItems.companyList.companyItems
  const pageNumber = stateItems.companyList.pageNumber
  const pageItems = companyItems.slice((8 * (activePage - 1)), (8 * activePage))
  dispatch(companyListPagination(pageItems, pageNumber))
}

