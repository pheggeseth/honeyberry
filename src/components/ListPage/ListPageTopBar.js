import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import ListEditMenu from './ListEditMenu/ListEditMenu';
// import ItemSearchBar from '../ItemSearch/ItemSearchBar/ItemSearchBar';

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
        <StoreName>
          {this.props.currentStore.name} <ListEditMenu />
        </StoreName>
        <Button className="dark-blue flat" style={{minWidth: '40px'}} 
          onClick={this.goToStoreSettings}>
          <FontAwesomeIcon icon={faCog}/>
        </Button>
      </TopBarContainer>
    );
  }
}

export default connect(mapStateToProps)(ListPageTopBar);