import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import LoginScreenContainer from './containers/LoginScreenContainer';
import withAuth from '../src/hocs/withAuth';

const Home = () => <Redirect to="/main" />;
const Main = () => <div>Main</div>;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={withAuth(Home)} />
          <Route path="/login" component={LoginScreenContainer} />
          <Route path="/nickname" component={LoginScreenContainer} />
          <Route path="/main" component={withAuth(Main)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
