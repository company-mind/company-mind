import { combineReducers } from 'redux';

import companyList from './companyList';
import companyArticle from './companyArticle';
import companyReviewList from './companyReviewList'

export default combineReducers({
  companyList,
  companyArticle,
  companyReviewList,
});
