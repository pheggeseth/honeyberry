// import { combineReducers } from 'redux';
import { STORE_ACTIONS } from '../actions/storeActions';

const stores = (state = [], action) => {
  switch (action.type) {
    case STORE_ACTIONS.SET_USER_STORES:
      return action.payload;
    default:
      return state;
  }
};

export default stores;