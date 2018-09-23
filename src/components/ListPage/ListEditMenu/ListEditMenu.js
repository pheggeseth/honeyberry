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
  itemMoveTargetStore: state.currentStore.itemMoveTargetStore,
  stores: state.userStores,
});

class ListEditMenu extends Component {
  componentWillUnmount() {
    const {editingList, selectingItems, movingItems, deletingItems} = this.props;
    if (editingList) this.stopListEditMode();
    if (selectingItems) this.stopListEditSelectMode();
    if (movingItems) this.stopListItemMoveMode();
    if (deletingItems) this.stopListItemDeleteMode();
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
    this.clearItemMoveTargetStore();
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

  setItemMoveTargetStore = storeId => () => {
    this.props.dispatch({
      type: CURRENT_STORE_ACTIONS.SET_ITEM_MOVE_TARGET_STORE,
      payload: storeId
    });
  };

  clearItemMoveTargetStore = () => {
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_ITEM_MOVE_TARGET_STORE});
  };

  moveSelectedItemsToTargetStore = () => {
    const {selectedItems, currentStore, itemMoveTargetStore, dispatch} = this.props;
    // console.log('moving items to store with id '+itemMoveTargetStore, selectedItems);
    dispatch({
      type: CURRENT_STORE_ACTIONS.MOVE_SELECTED_ITEMS_TO_TARGET_STORE,
      payload: {
        selectedItems: selectedItems,
        currentStoreId: currentStore.id,
        newStoreId: itemMoveTargetStore
      }
    });
    dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_ITEM_MOVE_TARGET_STORE});
    dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_MOVE_MODE});
    dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_SELECTED_ITEMS});
    dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_SELECTION_MODE});
    dispatch({type: CURRENT_STORE_ACTIONS.STOP_LIST_EDITING_MODE});
  };

  deleteSelectedListItems = () => {
    // console.log('deleting items:', this.props.selectedItems);
    const {selectedItems, currentStore, dispatch} = this.props;
    dispatch({
      type: CURRENT_STORE_ACTIONS.DELETE_SELECTED_ITEMS_FROM_STORE,
      payload: {
        selectedItems: selectedItems,
        storeId: currentStore.id
      }
    });
    dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_DELETE_MODE});
    dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_SELECTED_ITEMS});
    dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_SELECTION_MODE});
    dispatch({type: CURRENT_STORE_ACTIONS.STOP_LIST_EDITING_MODE});
  };

  render() {
    const {editingList, selectingItems, selectedItems, currentStore, movingItems, deletingItems, itemMoveTargetStore, stores} = this.props;
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
        .map(store => {
          if (itemMoveTargetStore === store.id) {
            return (
              <span key={store.id}>
                <button onClick={this.clearItemMoveTargetStore}>Cancel</button>
                <button onClick={this.moveSelectedItemsToTargetStore}>Confirm</button>
              </span>
            );
          } else {
            return <button key={store.id} onClick={this.setItemMoveTargetStore(store.id)}>{store.name}</button>;
          }
        })}
      </div>
    );
    const deleteItemsMenu = (
      <div>
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