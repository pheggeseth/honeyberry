import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import ListPage from './components/ListPage/ListPage';
import StoresPage from './components/StoresPage/StoresPage';
import StoreSettingsPage from './components/StoreSettingsPage/StoreSettingsPage';

import './styles/main.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header title="Project Base" />
        <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route
              path="/home"
              component={LoginPage}
            />
            <Route
              path="/register"
              component={RegisterPage}
            />
            <Route
              path="/user"
              component={UserPage}
            />
            <Route
              path="/list"
              component={ListPage}
            />
            <Route
              path="/stores"
              component={StoresPage}
            />
            <Route
              path="/store/:id/settings"
              component={StoreSettingsPage}
            />
            {/* OTHERWISE (no path!) */}
            <Route render={() => <h1>404</h1>} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect()(App);
