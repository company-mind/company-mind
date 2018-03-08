import * as firebase from 'firebase';
import _ from 'lodash'

export const LOADING = 'companyList/LOADING';
export const SEARCHLOADING = 'companyList/SEARCHLOADING';
export const SUCCESS = 'companyList/SUCCESS';
export const SEARCHSUCCESS = 'companyList/SEARCHSUCCESS';
export const PAGINATION = 'companyList/PAGINATION';

export function companyListLoading() {
  return {
    type: LOADING,
  };
}

export function companyListSearchLoading(value) {
  return {
    type: SEARCHLOADING,
    value,
  };
}

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

export function companyListSearchSuccess(results) {
  return {
    type: SEARCHSUCCESS,
    results,
  };
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

const initialState = {
  loading: false,
  searchLoading: false,
  value: '',
  companyItems: [],
  results: [],
  pageItems: [],
  pageNumber: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
    return {
      ...state,
      loading: true,
    };
    case SEARCHLOADING:
    return {
      ...state,
      searchLoading: true,
      value: action.value,
    };
    case SUCCESS:
    return {
      ...state,
      loading: false,
      companyItems: action.companyItems,
    };
    case SEARCHSUCCESS:
    return {
      ...state,
      searchLoading: false,
      results: action.results,
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

export const fetchCompanyList = () => async (dispatch, getState) => {
  dispatch(companyListLoading())
  const snapshot = await firebase.database().ref('company').once('value');
  const companyObj = snapshot.val();
  const companies = Object.entries(companyObj).map(([id, company]) => ({
    ...company,
    id,
  }));
  const newCompanies = companies.map(({ address, emotionScore, ...rest }) => ({
    ...rest,
    address: `${address.split(' ')[1]}/${address.split(' ')[2]}`,
    emotionScore: emotion(emotionScore),
  }));
  const companyItems = newCompanies.sort((x, y) => {
    if(x.reviewScore > y.reviewScore){
      return -1;
    } else if (x.reviewScore < y.reviewScore){
      return 1;
    } else {
      if (x.scrapScore > y.scrapScore){
        return -1;
      } else if (x.scrapScore < y.scrapScore){
        return 1;
      } else {
        return 0
      }
    }
  })

  dispatch(companyListSuccess(companyItems))
  let pageNumber = Math.trunc(companyItems.length / 8);
  if (pageNumber % 8) {
    pageNumber++;
  }
  const pageItems = companyItems.slice(0, 8)
  dispatch(companyListPagination(pageItems, pageNumber))
}

export const fetchPagination = ({ activePage }) => async (dispatch, getState) => {
  const stateItems = getState()
  const companyItems = stateItems.companyList.companyItems
  const pageNumber = stateItems.companyList.pageNumber
  const pageItems = companyItems.slice((8 * (activePage - 1)), (8 * activePage))
  dispatch(companyListPagination(pageItems, pageNumber))
}

export const fetchSearch = ({ value }) => async (dispatch, getState) => {
  dispatch(companyListSearchLoading(value))
  const stateItems = getState()
  const source = stateItems.companyList.companyItems
  setTimeout(() => {
    const re = new RegExp(_.escapeRegExp(value), 'i')
    const isMatch = result => re.test(result.name)
    const results = ({
      result: _.filter(source, isMatch)
    })
    dispatch(companyListSearchSuccess(results.result))

    let pageNumber = Math.trunc(results.result.length / 8);
    if (pageNumber % 8) {
      pageNumber++
    }
    const pageItems = results.result.slice(0, 8)
    dispatch(companyListPagination(pageItems, pageNumber))
  }, 500)
}

export const fetchResultSelect = ({ result }) => async (dispatch, getState) => {
  setTimeout(() => {
    dispatch(companyListSearchLoading(result.name))
    dispatch(companyListSearchSuccess([result]))
    const pageItems = [result]
    dispatch(companyListPagination(pageItems, 1))
  }, 505)
}
