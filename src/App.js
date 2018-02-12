import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginScreenContainer from './containers/LoginScreenContainer';
import NicknameScreen from './components/NicknameScreen';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact />
          <Route path="/login" component={LoginScreenContainer} />
          <Route path="/nickname" component={NicknameScreen} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
