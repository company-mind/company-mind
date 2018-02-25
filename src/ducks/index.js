import { combineReducers } from 'redux';

import companyList from './companyList';
import review from './review';

export default combineReducers({
  companyList,
  review,
});

