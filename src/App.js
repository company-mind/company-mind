import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './ducks'
import LoginScreenContainer from './containers/LoginScreenContainer';
import CompanyListContainer from './containers/CompanyListContainer';
import CompanyDetailContainer from './containers/CompanyDetailContainer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

class App extends Component { // router 설정
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="/" exact />
            <Route path="/login" component={LoginScreenContainer} />
            <Route path="/list" component={CompanyListContainer} />
            <Route path="/companyDetail/:id" component={CompanyDetailContainer}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
