import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListEditMenu from './ListEditMenu/ListEditMenu';
import ItemSearchBar from '../ItemSearch/ItemSearchBar/ItemSearchBar';

// import styled from 'styled-components';
import { TopBarContainer, Button } from '../styledComponents';


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
      <TopBarContainer className="TopBarContainer">
        {/* <TopBar className="top-bar"> */}
            <span style={{flex: '1 1 auto'}}>
              {this.props.currentStore.name}
            </span>
            <Button className="light-blue flat" style={{height: '100%'}} onClick={this.goToStoreSettings}>Settings</Button>
          
          
          
          {/* <ItemSearchBar /> */}
        {/* </TopBar> */}
      </TopBarContainer>
    );
  }
}

export default connect(mapStateToProps)(ListPageTopBar);