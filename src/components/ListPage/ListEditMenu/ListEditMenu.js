import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { CURRENT_STORE_ACTIONS } from '../../../redux/actions/currentStoreActions';

const ClickAway = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  position: fixed;
  top: 0;
`;

const mapStateToProps = state => ({
  editingList: state.currentStore.editingList,
  selectingItems: state.currentStore.selectingItems,
  selectedItems: state.currentStore.selectedItems,
  currentStore: state.currentStore.store,
  movingItems: state.currentStore.movingItems,
  stores: state.userStores,
});

class ListEditMenu extends Component {
  toggleListEditMode = () => {
    const {dispatch} = this.props;
    if (this.props.selectingItems) {
      dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_SELECTED_ITEMS});
      dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_SELECTION_MODE});
    }
    dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_LIST_EDITING_MODE});
  };

  startListEditSelect = () => {
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_SELECTION_MODE});
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.SET_SELECTED_ITEMS, payload: []});
  };

  stopListEditSelect = () => {
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_SELECTED_ITEMS});
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_SELECTION_MODE});
  };

  startListItemMoveMode = () => {
    console.log('now moving items:', this.props.selectedItems);
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_MOVE_MODE});
  };

  stopListItemMoveMode = () => {
    console.log('stopping moving items:', this.props.selectedItems);
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_MOVE_MODE});
  };

  deleteListItems = () => {
    console.log('deleting items:', this.props.selectedItems);
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_DELETE_MODE});
  };

  moveSelectedItemsToStore = newStoreId => () => {
    const {selectedItems, currentStore, dispatch} = this.props;
    console.log('moving items to store with id '+newStoreId, selectedItems);
    dispatch({
      type: CURRENT_STORE_ACTIONS.MOVE_SELECTED_ITEMS_TO_OTHER_STORE,
      payload: {
        selectedItems: selectedItems,
        currentStoreId: currentStore.id,
        newStoreId: newStoreId
      }
    });
    dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_SELECTED_ITEMS});
    dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_SELECTION_MODE});
    dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_LIST_EDITING_MODE});
  };

  render() {
    const {editingList, selectingItems, currentStore, movingItems, stores} = this.props;
    let editListButtons = <div><button onClick={this.toggleListEditMode}>Edit List</button></div>;
    if (editingList && !selectingItems) {
      editListButtons = (
        <div>
          <div style={{zIndex: 101, position: 'relative'}}>
            <button onClick={this.toggleListEditMode}>Back</button>
            <button onClick={this.startListEditSelect}>Select</button>
            <button>Share</button>
          </div>
          <ClickAway onClick={this.toggleListEditMode} />
        </div>
      );
    } else if (editingList && selectingItems && !movingItems) {
      editListButtons = (
        <div>
          <button onClick={this.stopListEditSelect}>Back</button>
          <button onClick={this.startListItemMoveMode}>Move</button>
          <button onClick={this.deleteListItems}>Delete</button>
        </div>
      );
    } else if (editingList && movingItems) {
      editListButtons = (
        <div>
          <button onClick={this.stopListItemMoveMode}>Back</button>
          {stores.filter(store => store.id !== currentStore.id)
          .map(store => <button key={store.id} onClick={this.moveSelectedItemsToStore(store.id)}>{store.name}</button>)}
        </div>
      );
    }

    return (editListButtons);
  }
}

export default connect(mapStateToProps)(ListEditMenu);