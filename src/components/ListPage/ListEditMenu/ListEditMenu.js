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
  deletingItems: state.currentStore.deletingItems,
  stores: state.userStores,
});

class ListEditMenu extends Component {
  // toggleListEditMode = () => {
  //   const {dispatch} = this.props;
  //   if (this.props.selectingItems) {
  //     dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_SELECTED_ITEMS});
  //     dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_SELECTION_MODE});
  //   }
  //   dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_LIST_EDITING_MODE});
  // };

  componentWillUnmount() {
    this.stopListEditMode();
    this.stopListEditSelectMode();
    this.stopListItemMoveMode();
    this.stopListItemDeleteMode();
  }

  startListEditMode = () => {
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.START_LIST_EDITING_MODE});
  };

  stopListEditMode = () => {
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.STOP_LIST_EDITING_MODE});
  }

  startListEditSelectMode = () => {
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.START_ITEM_SELECTION_MODE});
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.SET_SELECTED_ITEMS, payload: []});
  };

  stopListEditSelectMode = () => {
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_SELECTED_ITEMS});
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_SELECTION_MODE});
  };

  startListItemMoveMode = () => {
    if (this.props.selectedItems.length) {
      this.props.dispatch({type: CURRENT_STORE_ACTIONS.START_ITEM_MOVE_MODE});
    }
  };

  stopListItemMoveMode = () => {
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_MOVE_MODE});
  };

  startListItemDeleteMode = () => {
    if (this.props.selectedItems.length) {
      this.props.dispatch({type: CURRENT_STORE_ACTIONS.START_ITEM_DELETE_MODE});
    }
  };

  stopListItemDeleteMode = () => {
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_DELETE_MODE});
  }

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

  deleteSelectedListItems = () => {
    console.log('deleting items:', this.props.selectedItems);
  };

  render() {
    const {editingList, selectingItems, selectedItems, currentStore, movingItems, deletingItems, stores} = this.props;
    const editListButton = <div><button onClick={this.startListEditMode}>Edit List</button></div>;
    const editListMenu = (
      <div>
        <div style={{zIndex: 101, position: 'relative'}}>
          <button onClick={this.stopListEditMode}>Back</button>
          <button onClick={this.startListEditSelectMode}>Select</button>
          <button>Share</button>
        </div>
        <ClickAway onClick={this.stopListEditMode} />
      </div>
    );
    const selectItemsMenu = (
      <div>
        <button onClick={this.stopListEditSelectMode}>Back</button>
        <button onClick={this.startListItemMoveMode}>Move</button>
        <button onClick={this.startListItemDeleteMode}>Delete</button>
      </div>
    );
    const moveItemsMenu = (
      <div>
        <button onClick={this.stopListItemMoveMode}>Back</button>
        {stores.filter(store => store.id !== currentStore.id)
        .map(store => <button key={store.id} onClick={this.moveSelectedItemsToStore(store.id)}>{store.name}</button>)}
      </div>
    );
    const deleteItemsMenu = (
      <div>
        Are you sure?
        <button onClick={this.stopListItemDeleteMode}>Cancel</button>
        <button onClick={this.deleteSelectedListItems}>Confirm</button>
      </div>
    );
    
    if (editingList && deletingItems && selectedItems.length) return deleteItemsMenu;
    else if (editingList && movingItems && selectedItems.length) return moveItemsMenu;
    else if (editingList && selectingItems) return selectItemsMenu;
    else if (editingList) return editListMenu;
    else return editListButton;
  }
}

export default connect(mapStateToProps)(ListEditMenu);