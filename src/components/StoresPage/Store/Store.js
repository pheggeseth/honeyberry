import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STORE_ACTIONS } from '../../../redux/actions/storeActions';

import styled from 'styled-components';

const EditButton = styled.button`
  
`;

class Store extends Component {
  // when the user clicks the name of the store,
  // set that store to be the current store
  setCurrentStore = () => {
    this.props.dispatch({
      type: STORE_ACTIONS.SET_CURRENT_STORE,
      payload: this.props.storeObj
    });
    // redirect to the list for that store
    this.props.history.push('list');
  };

  goToStoreSettings = storeId => () => {
    this.props.history.push(`/store/${storeId}/settings`);
  };

  deleteStore = storeId => () => {
    
  };

  render() {
    const {storeObj} = this.props;
    return (
      <div>
        <span onClick={this.setCurrentStore}>{storeObj.name}</span>
        <EditButton onClick={this.goToStoreSettings(storeObj.id)}>Settings</EditButton>
      </div>
    );
  }
}

export default connect()(Store);