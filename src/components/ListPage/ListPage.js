import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';
import { ITEM_ACTIONS } from '../../redux/actions/itemActions';
import { CATEGORY_ACTIONS } from '../../redux/actions/categoryActions';

import CurrentItems from './CurrentItems/CurrentItems';
import CompletedItems from './CompletedItems/CompletedItems';
import EssentialItems from './EssentialItems/EssentialItems';

const mapStateToProps = state => ({
  user: state.user,
  items: state.items,
  categories: state.categories,
  currentStore: state.currentStore.store,
  list: state.currentStore.list,
  essentials: state.currentStore.essentials,
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

  render() {
    let content = null;
    const {list} = this.props;
    if (this.props.user.userName) {
      content = (
        <div>
          <CurrentItems items={list.filter(item => !item.completed)} />
          <CompletedItems items={list.filter(item => item.completed)} />
          <EssentialItems items={this.props.essentials} />
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {JSON.stringify(this.props.categories)}
        {JSON.stringify(this.props.items)}
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ListPage);
