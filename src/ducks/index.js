import { combineReducers } from 'redux';

import companyList from './companyList';
import companyArticle from './companyArticle';

export default combineReducers({
  companyList,
  companyArticle,
});

