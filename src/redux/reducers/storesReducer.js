import { combineReducers } from 'redux';
import { STORE_ACTIONS } from '../actions/storeActions';

const userStores = (state = [], action) => {
  switch (action.type) {
    case STORE_ACTIONS.SET_USER_STORES:
      return action.payload;
    default:
      return state;
  }
};

const currentStore = (state = {}, action) => {
  switch(action.type) {
    case STORE_ACTIONS.SET_CURRENT_STORE:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  userStores,
  currentStore
});