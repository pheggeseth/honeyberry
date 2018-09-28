import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
// import UserPage from './components/UserPage/UserPage';
import ListPage from './components/ListPage/ListPage';
import StoresPage from './components/StoresPage/StoresPage';
import StoreSettingsPage from './components/StoreSettingsPage/StoreSettingsPage';
import MorePage from './components/MorePage/MorePage';
// import Nav from './components/Nav/Nav';

import './styles/main.css';

// import styled from 'styled-components';
import { ScreenContainer, Screen, Content, BottomNav } from './components/styledComponents';

const mapStateToProps = state => ({
  user: state.user
});

class App extends React.Component {
  render() {
    const {user} = this.props;
    return (
      <Router>
        <Switch>
          <ScreenContainer className="container">
            <Screen className="screen">
              <Content className="content">
                {/* <Redirect exact from="/" to="/home" /> */}
                <Route
                  path="/home"
                  component={LoginPage}
                />
                <Route
                  path="/register"
                  component={RegisterPage}
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
                <Route
                  path="/more"
                  component={MorePage}
                />
                {/* OTHERWISE (no path!) */}
                {/* <Route render={() => <h1>404</h1>} /> */}
              </Content>
              {!user.isLoading && user.userName 
              ? <BottomNav className="bottom-nav">
                <ul>
                  <li>
                    <Link to="/list">
                      List
                    </Link>
                  </li>
                  <li>
                    <Link to="/stores">
                      Stores
                    </Link>
                  </li>
                  <li>
                    <Link to="/more">
                      More
                    </Link>
                  </li>
                </ul>
              </BottomNav> 
              : null}
            </Screen>
          </ScreenContainer>
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
