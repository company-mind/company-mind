import * as firebase from 'firebase';

export const SUCCESS = 'companyList/SUCCESS';
export const HASMORE = 'companyList/HASMORE';
export const COMPLETE = 'companyList/COMPLETE';


export function companyhasmore() {
  return {
    type: HASMORE,
  };
}

export function companyListComplete(completeList) {
  return {
    type: COMPLETE,
    completeList,
  };
}

export function companyListSuccess(companies) {
  return {
    type: SUCCESS,
    companies,
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
  complete: false,
  hasmore: false,
  companies: [],
  completeList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HASMORE:
      return {
        ...state,
        hasmore: true,
      };
      case SUCCESS:
      return {
        ...state,
        companies: action.companies,
      };
      case COMPLETE:
        return {
          ...state,
          complete: true,
          hasmore: false,
          completeList: action.completeList,
        };
    default:
      return state;
  }
}


let listNumber = 0

export const fetchCompanyList = () => async (dispatch) => {
  listNumber = 0
  dispatch(companyhasmore());
}

export const fetchOnCompanyList = ({ complete, hasmore }) => async (dispatch) => {
  console.log(complete, hasmore)
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

  if(complete && hasmore){
    dispatch(companyListComplete(reviewSort))
  } else{
     if(!complete){
       if ( listNumber <= reviewSort.length ){
         const slice = reviewSort.slice(0, (listNumber))
         dispatch(companyListSuccess(slice));
         listNumber = listNumber + 5
       } else {
         const slice = reviewSort.slice(0, (listNumber))
         dispatch(companyListComplete(slice))
       }
     } else {
       const slice = reviewSort.slice(0, (listNumber))
       dispatch(companyListComplete(slice))
       console.log(complete, hasmore)
    }
  }
}
