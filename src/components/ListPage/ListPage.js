import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';
import { ITEM_ACTIONS } from '../../redux/actions/itemActions';
import { CATEGORY_ACTIONS } from '../../redux/actions/categoryActions';

import ItemSearch from '../ItemSearch/ItemSearch';
import ItemEdit from '../ItemEdit/ItemEdit';
import CurrentItems from './CurrentItems/CurrentItems';
import CompletedItems from './CompletedItems/CompletedItems';
import EssentialItems from './EssentialItems/EssentialItems';
import ItemsAll from '../ItemsAll/ItemsAll';

const ClickAway = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  position: fixed;
  top: 0;
`;

const mapStateToProps = state => ({
  user: state.user,
  items: state.items,
  categories: state.categories,
  stores: state.userStores,
  currentStore: state.currentStore.store,
  list: state.currentStore.list,
  essentials: state.currentStore.essentials,
  searching: state.itemSearch.searching,
  editingItem: state.currentStore.editingItem,
  editingList: state.currentStore.editingList,
  selectingItems: state.currentStore.selectingItems,
  selectedItems: state.currentStore.selectedItems,
  movingItems: state.currentStore.movingItems,
});

class ListPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});

    if (this.props.items.length === 0) {
      this.props.dispatch({
        type: ITEM_ACTIONS.FETCH_ALL_ITEMS
      });
    }

    if (this.props.categories.length === 0) {
      this.props.dispatch({
        type: CATEGORY_ACTIONS.FETCH_ALL_CATEGORIES
      });
    }

    if (this.props.currentStore.id) {
      this.props.dispatch({
        type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
        payload: this.props.currentStore.id
      });
      this.props.dispatch({
        type: CURRENT_STORE_ACTIONS.FETCH_STORE_ESSENTIALS,
        payload: this.props.currentStore.id
      });
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

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

  moveSelectedItemsToStore = storeId => () => {
    console.log('moving items to store with id '+storeId, this.props.selectedItems);
  };

  render() {
    let content = null;
    const {list, searching, editingItem, essentials, user, editingList, selectingItems, currentStore, movingItems, stores} = this.props;

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

    if (editingItem) {
      content = (
        <div>
          <ItemEdit />
        </div>
      );
    } else {
      content = (
        <div>
          <ItemSearch onFocus={this.startItemSearchMode} />
          {searching
          ? null
          : <div>
              <CurrentItems items={list.filter(item => !item.completed)} />
              <CompletedItems items={list.filter(item => item.completed)} />
              <EssentialItems items={essentials} />
              <ItemsAll />
            </div>}
        </div>
      );
    }

    
    
    return (
      <div>
        <Nav />
        {/* {JSON.stringify(list)} */}
        {editListButtons}
        { user.userName ? content : null }
      </div>
    );
  }
}

export default connect(mapStateToProps)(ListPage);
