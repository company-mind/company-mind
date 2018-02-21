import * as firebase from 'firebase';

export const LOADING = 'companyList/LOADING';
export const SUCCESS = 'companyList/SUCCESS';
export const REDIRECT = 'companyList/REDIRECT';

export function companyListLoading() {
  return {
    type: LOADING,
  };
}

export function companyListSuccess(companies) {
  return {
    type: SUCCESS,
    companies,
  };
}

export function companyListRedirect(company) {
  return {
    type: REDIRECT,
    company,
  };
}

const initialState = {
  loading: false,
  redirect: false,
  companies: [],
  company: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS:
      return {
        loading: false,
        companies: action.companies,
      };
    case REDIRECT:
      return {
        redirect: true,
        company: action.company,
      };
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

export const fetchCompanyList = () => async (dispatch) => {
  dispatch(companyListLoading());
  const snapshot = await firebase.database().ref('company').once('value');
  const companyObj = snapshot.val();
  const companies = Object.entries(companyObj).map(([id, company]) => ({
    ...company,
    id
  }));
  const newCompanies = companies.map(({address, emotionScore, ...rest}) => ({
    ...rest,
    address: address.split(' ')[1] + "/" + address.split(' ')[2],
    emotionScore: emotion(emotionScore)
  }));
  const scrapScore = newCompanies.sort((x, y) => x.scrapScore - y.scrapScore)
  const reviewSort = scrapScore.sort((x, y) => y.reviewScore - x.reviewScore)
  dispatch(companyListSuccess(reviewSort));
};

export const fetchCompanyRedirect = (id) => async (dispatch) => {
  const snapshot = await firebase.database().ref(`company/${id}`).once('value');
  const companyObj = snapshot.val();
  companyObj.shortAddress = companyObj.address.split(' ')[1] + "/" + companyObj.address.split(' ')[2]
  dispatch(companyListRedirect(companyObj))
}
