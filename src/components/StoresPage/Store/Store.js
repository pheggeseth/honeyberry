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

  goToStoreSettings = () => {
    this.props.history.push(`/store/${this.props.storeObj.id}/settings`);
  };

  deleteStore = () => {
    const confirmed = window.confirm('Are you sure? You cannot undo this action.');
    if (confirmed) {
      this.props.dispatch({
        type: STORE_ACTIONS.DELETE_STORE,
        payload: this.props.storeObj.id
      });
    }
  };

  render() {
    const {storeObj} = this.props;
    return (
      <div>
        <span onClick={this.setCurrentStore} style={{color: 'white', fontWeight: 'bold'}}>{storeObj.name}</span>
        <EditButton onClick={this.goToStoreSettings}>Settings</EditButton>
        <button onClick={this.deleteStore}>Delete</button>
      </div>
    );
  }
}

export default connect()(Store);