import React, { Component } from 'react';
import { connect } from 'react-redux';
// import styled from 'styled-components';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { STORE_ACTIONS } from '../../redux/actions/storeActions';
import { ITEM_SELECT_ACTIONS } from '../../redux/actions/itemSelectActions';

import ItemsAll from '../ItemsAll/ItemsAll';

const mapStateToProps = state => ({
  user: state.user,
  userStores: state.userStores,
  currentStore: state.currentStore.store,
  items: state.items,
  categories: state.categories,
  selectingItems: state.itemSelect.selectingItems,
  selectedItems: state.itemSelect.selectedItems,
});

// gets store id from route: '/store/:id/settings'
class StoreSettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentStore.name && !prevState.storeName) {
      return {
        storeName: nextProps.currentStore.name
      };
    } else {
      return prevState;
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: USER_ACTIONS.FETCH_USER});
    dispatch({type: STORE_ACTIONS.FETCH_USER_STORES});
  }

  componentDidUpdate() {
    const {user, history} = this.props;
    const {dispatch, currentStore, match, userStores} = this.props;
    if (!user.isLoading && user.userName === null) {
      history.push('home');
    }

    if (userStores.length && currentStore.id !== Number(match.params.id)) {
      dispatch({
        type: STORE_ACTIONS.SET_CURRENT_STORE,
        payload: userStores.find(store => store.id === Number(match.params.id))
      });
    }
  }

  changeStoreName = event => {
    this.setState({
      storeName: event.target.value
    });
  };

  render() {
    const storeId = this.props.match.params.id;
    return (
      <div>
        <Nav />
        <input type="text" value={this.state.storeName} onChange={this.changeStoreName}/>
        <ItemsAll />
      </div>
    );
  }
}

export default connect(mapStateToProps)(StoreSettingsPage);