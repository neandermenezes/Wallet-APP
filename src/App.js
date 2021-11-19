import React from 'react';
import { Route, Switch } from 'react-router';

import './css/style.css';

import Login from './ReactPages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
