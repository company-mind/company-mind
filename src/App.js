import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './ducks';
import withAuth from '../src/hocs/withAuth';

import LoginScreenContainer from './containers/LoginScreenContainer';
import CompanyListContainer from './containers/CompanyListContainer';
import CompanyDetailContainer from './containers/CompanyDetailContainer';
import ReviewFormContainer from './containers/ReviewFormContainer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

class App extends Component {
  // router 설정
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="/" exact />
            <Route path="/login" component={LoginScreenContainer} />
            <Route path="/nickname" component={LoginScreenContainer} />
            <Route path="/list" component={CompanyListContainer} />
            <Route path="/companyDetail/:companyId" component={CompanyDetailContainer} />
            <Route path="/companyDetail/:companyId/addReview" component={ReviewFormContainer} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
