import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STORE_ACTIONS } from '../../../redux/actions/storeActions';

import styled from 'styled-components';
import { StoresListItem, StoreName, Button } from '../../styledComponents';

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
      <StoresListItem>
        <StoreName onClick={this.setCurrentStore}>
          {storeObj.name}
        </StoreName>
        <Button className="light-blue flat" onClick={this.goToStoreSettings}>Settings</Button>
        <Button className="red flat" onClick={this.deleteStore}>Delete</Button>
      </StoresListItem>
    );
  }
}

export default connect()(Store);