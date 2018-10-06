import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ListPage from './components/ListPage/ListPage';
import StoresPage from './components/StoresPage/StoresPage';
import StoreSettingsPage from './components/StoreSettingsPage/StoreSettingsPage';
import MorePage from './components/MorePage/MorePage';

import './styles/main.css';

import { ScreenContainer, Screen, Content, BottomNav, BottomNavLink } from './components/styledComponents';

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
                <Redirect exact from="/" to="/home" />
                {/* OTHERWISE (no path!) */}
                {/* <Route render={() => <h1>404</h1>} /> */}
              </Content>
              {/* don't show the bottom nav unless the user has fully loaded */}
              {!user.isLoading && user.userName 
              ? <BottomNav className="bottom-nav">
                <ul>
                  <li>
                    <BottomNavLink to="/list" active={window.location.hash.slice(2) === 'list' ? 1 : 0}>
                      List
                    </BottomNavLink>
                  </li>
                  <li>
                    <BottomNavLink to="/stores" active={window.location.hash.slice(2) === 'stores' ? 1 : 0}>
                      Stores
                    </BottomNavLink>
                  </li>
                  <li>
                    <BottomNavLink to="/more" active={window.location.hash.slice(2) === 'more' ? 1 : 0}>
                      More
                    </BottomNavLink>
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
