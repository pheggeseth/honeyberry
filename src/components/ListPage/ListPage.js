import React, { Component } from 'react';
import { connect } from 'react-redux';
// import styled from 'styled-components';

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
import ListEditMenu from './ListEditMenu/ListEditMenu';

const mapStateToProps = state => ({
  user: state.user,
  items: state.items,
  categories: state.categories,
  currentStore: state.currentStore.store,
  list: state.currentStore.list,
  essentials: state.currentStore.essentials,
  searching: state.itemSearch.searching,
  editingItem: state.currentStore.editingItem,
});

class ListPage extends Component {
  componentDidMount() {
    const {dispatch, categories, items, currentStore} = this.props;
    dispatch({type: USER_ACTIONS.FETCH_USER});

    if (items.length === 0) dispatch({type: ITEM_ACTIONS.FETCH_ALL_ITEMS});
    if (categories.length === 0) dispatch({type: CATEGORY_ACTIONS.FETCH_ALL_CATEGORIES});

    if (currentStore.id) {
      dispatch({
        type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
        payload: currentStore.id
      });
      dispatch({
        type: CURRENT_STORE_ACTIONS.FETCH_STORE_ESSENTIALS,
        payload: currentStore.id
      });
    }
  }

  componentDidUpdate() {
    const {user, history} = this.props;
    if (!user.isLoading && user.userName === null) {
      history.push('home');
    }
  }

  render() {
    let content = null;
    const {list, searching, editingItem, essentials, user} = this.props;

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
        <ListEditMenu />
        { user.userName ? content : null }
      </div>
    );
  }
}

export default connect(mapStateToProps)(ListPage);
