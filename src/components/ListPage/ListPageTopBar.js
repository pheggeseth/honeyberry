import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListEditMenu from './ListEditMenu/ListEditMenu';
import ItemSearchBar from '../ItemSearch/ItemSearchBar/ItemSearchBar';

// import styled from 'styled-components';
import { TopBarContainer } from '../styledComponents';


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
      <TopBarContainer className="ListPageTopBarContainer">
        {/* <TopBar className="top-bar"> */}
          <div>
            {this.props.currentStore.name}
            <button onClick={this.goToStoreSettings}>Settings</button>
          </div>
          <ListEditMenu />
          {/* <ItemSearchBar /> */}
        {/* </TopBar> */}
      </TopBarContainer>
    );
  }
}

export default connect(mapStateToProps)(ListPageTopBar);