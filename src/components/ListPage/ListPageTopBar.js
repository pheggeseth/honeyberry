import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTrash } from '@fortawesome/free-solid-svg-icons';

import ListEditMenu from './ListEditMenu/ListEditMenu';
import ItemSearchBar from '../ItemSearch/ItemSearchBar/ItemSearchBar';

// import styled from 'styled-components';
import { TopBarContainer, StoreName, Button } from '../styledComponents';


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
            <StoreName>
              {this.props.currentStore.name}
            </StoreName>
            <Button className="dark-blue flat" style={{height: '100%'}} 
              onClick={this.goToStoreSettings}>
              <FontAwesomeIcon icon={faCog}/>
            </Button>
          
          
          
          {/* <ItemSearchBar /> */}
        {/* </TopBar> */}
      </TopBarContainer>
    );
  }
}

export default connect(mapStateToProps)(ListPageTopBar);