import * as firebase from 'firebase';

export const LOADING = 'companyList/LOADING';
export const SUCCESS = 'companyList/SUCCESS';

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

const initialState = {
  loading: false,
  companies: [],
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
    default:
      return state;
  }
}

export const fetchCompanyList = () => async (dispatch) => {
  dispatch(companyListLoading());
  const snapshot = await firebase.database().ref('company').orderByChild('reviewScore').once('value');
  const companyObj = snapshot.val();
  const companies = Object.entries(companyObj).map(([id, company]) => ({
    ...company,
    id
  }));
  const newCompanies = companies.map(({address, ...rest}) => ({
    ...rest,
    address: address.split(' ')[1] + "/" + address.split(' ')[2]
  }));
  dispatch(companyListSuccess(newCompanies));
};
