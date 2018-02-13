import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
} from 'react-router-dom';

import LoginScreenContainer from './containers/LoginScreenContainer';

class App extends Component { // router 설정
  render() {
    return (
        <BrowserRouter>
          <div>
            <Route path="/" exact />
            <Route path="/login" component={LoginScreenContainer} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
