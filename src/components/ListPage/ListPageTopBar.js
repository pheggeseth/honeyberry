import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListEditMenu from './ListEditMenu/ListEditMenu';
import ItemSearchBar from '../ItemSearch/ItemSearchBar/ItemSearchBar';

import styled from 'styled-components';
const Container = styled.div`
  width: 100%;
  height: 75px;
  max-width: 778px;
  background-color: lightpink;
  position: fixed;
  top: 0;
  margin-left: -10px;
  z-index: 100;
`;

const mapStateToProps = state => ({
  currentStore: state.currentStore.store
});

class ListPageTopBar extends Component {
  goToStoreSettings = () => {
    const {history, currentStore} = this.props;
    history.push(`/store/${currentStore.id}/settings`);
  };

  render() {
    return (
      <Container className="container">
        {/* <TopBar className="top-bar"> */}
          <div>
            {this.props.currentStore.name}
            <button onClick={this.goToStoreSettings}>Settings</button>
          </div>
          <ListEditMenu />
          <ItemSearchBar />
        {/* </TopBar> */}
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ListPageTopBar);