import React, { Component } from 'react';
import { connect } from 'react-redux';
// import styled from 'styled-components';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { STORE_ACTIONS } from '../../redux/actions/storeActions';
import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';
// import { AREA_ACTIONS } from '../../redux/actions/areaActions';
// import { ITEM_SELECT_ACTIONS } from '../../redux/actions/itemSelectActions';

import StoreAreas from '../StoreAreas/StoreAreas';
import ItemsAll from '../ItemsAll/ItemsAll';

const mapStateToProps = state => ({
  user: state.user,
  userStores: state.userStores,
  currentStore: state.currentStore.store,
  items: state.items,
  categories: state.categories,
  areas: state.currentStore.areas,
  selectingItems: state.itemSelect.selectingItems,
  selectedItems: state.itemSelect.selectedItems,
});

// gets store id from route: '/store/:id/settings'
class StoreSettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: '',
      newAreaName: ''
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
    const {dispatch, match} = this.props;
    dispatch({type: USER_ACTIONS.FETCH_USER});
    dispatch({type: STORE_ACTIONS.FETCH_USER_STORES});
    dispatch({
      type: CURRENT_STORE_ACTIONS.FETCH_STORE_AREAS,
      payload: match.params.id
    });
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

  handleStoreNameChange = event => {
    this.setState({
      storeName: event.target.value
    });
  };

  handleNewAreaNameChange = event => {
    this.setState({
      newAreaName: event.target.value
    });
  };

  addNewArea = () => {
    const {currentStore, dispatch} = this.props;
    console.log(`add new area ${this.state.newAreaName} to store ${currentStore.name}`);
    dispatch({
      type: CURRENT_STORE_ACTIONS.ADD_STORE_AREA,
      payload: {
        areaName: this.state.newAreaName,
        storeId: currentStore.id,
      }
    });
    this.setState({
      newAreaName: ''
    });
  };

  render() {
    // const storeId = this.props.match.params.id;
    return (
      <div>
        <Nav />
        <div>
          {/* {JSON.stringify(this.props.areas)}<br /> */}
          Store Name: <input type="text" placeholder="Store Name"
            value={this.state.storeName} 
            onChange={this.handleStoreNameChange}
          />
        </div>
        <div>
          Add New Area: <input type="text" placeholder="Name"
            value={this.state.newAreaName}
            onChange={this.handleNewAreaNameChange} 
          /> 
          <button onClick={this.addNewArea}>Add</button>
        </div>
        <StoreAreas />
        <ItemsAll />
      </div>
    );
  }
}

export default connect(mapStateToProps)(StoreSettingsPage);