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

import styled from 'styled-components';

const MAX_SCREEN_WIDTH = 768;
const BOTTOM_NAV_HEIGHT = 60;
const DESKTOP_VERTICAL_MARGIN = 5; //vh
const CONTENT_MARGIN = 10;
const TILE_SIZE = 118;
const TILE_MARGIN = 3;
const TOTAL_TILE_WIDTH = TILE_SIZE + TILE_MARGIN * 2;

const Container = styled.div`
  height: 100%;

  @media only screen 
  and (min-width: ${MAX_SCREEN_WIDTH}px) {
  // and (min-height: ${MAX_SCREEN_WIDTH}px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Screen = styled.div`
  height: 100%;
  width: 100%;
  max-width: 768px;
  background-color: gainsboro;

  @media only screen 
  and (min-width: ${MAX_SCREEN_WIDTH + 1}px)
  and (min-height: ${MAX_SCREEN_WIDTH + 1}px) {
    max-height: ${100 - DESKTOP_VERTICAL_MARGIN * 2}vh;
  }
`;

const Content = styled.div`
  // height: 100%;
  clear: both;
  padding: ${CONTENT_MARGIN}px;
  margin-bottom: ${BOTTOM_NAV_HEIGHT}px;
`;

const BottomNav = styled.div`
  height: ${BOTTOM_NAV_HEIGHT}px;
  width: inherit;
  max-width: inherit;
  background-color: dimgray;
  position: fixed;
  bottom: 0;
  display: flex;

  @media only screen 
  and (min-width: ${MAX_SCREEN_WIDTH + 1}px)
  and (min-height: ${MAX_SCREEN_WIDTH + 1}px) {
    margin-bottom: 5vh;
  }

  & > ul {
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  & > ul li a {
    color: white;
    text-align: center;
    text-decoration: none;
  }
`;



const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;

  // @media only screen and (min-width: ${TOTAL_TILE_WIDTH * 3}px) {
  //   max-width: ${TOTAL_TILE_WIDTH * 3}px;
  // }
  @media only screen and (min-width: ${TOTAL_TILE_WIDTH * 4}px) {
    max-width: ${TOTAL_TILE_WIDTH * 4}px;
  }
  @media only screen and (min-width: ${TOTAL_TILE_WIDTH * 5}px) {
    max-width: ${TOTAL_TILE_WIDTH * 5}px;
  }
  @media only screen and (min-width: ${TOTAL_TILE_WIDTH * 6}px) {
    max-width: ${TOTAL_TILE_WIDTH * 6}px;
  }
`;

const ItemTile = styled.div`
  // width: 33vw;
  // height: 33vw;
  height: ${TILE_SIZE}px;
  width: ${TILE_SIZE}px;
  background-color: lightgreen;
  margin: ${TILE_MARGIN}px;

  @media only screen and (max-width: 415px) {
    width: calc((100vw - ${CONTENT_MARGIN * 2 + TILE_MARGIN * 6}px) / 3);
    height: calc((100vw - ${CONTENT_MARGIN * 2 + TILE_MARGIN * 6}px) / 3);
  }
`;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Container className="container">
            <Screen className="screen">
              <Content className="content">
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
              <BottomNav className="bottom-nav">
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
            </Screen>
          </Container>
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);
