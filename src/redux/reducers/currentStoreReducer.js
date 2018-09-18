import { combineReducers } from 'redux';
import { STORE_ACTIONS } from '../actions/storeActions';
import { CURRENT_STORE_ACTIONS } from '../actions/currentStoreActions';

const store = (state = {}, action) => {
  switch(action.type) {
    case STORE_ACTIONS.SET_CURRENT_STORE:
      return action.payload;
    default:
      return state;
  }
};

const list = (state = [], action) => {
  switch(action.type) {
    case CURRENT_STORE_ACTIONS.SET_LIST:
      return action.payload;
    default:
      return state;
  }
};

const essentials = (state = [], action) => {
  switch(action.type) {
    case CURRENT_STORE_ACTIONS.SET_STORE_ESSENTIALS:
      return action.payload;
    default:
      return state;
  }
};

// IMPORTED TO MAIN REDUX STORE AS "currentStore"
export default combineReducers({
  store,
  list,
  essentials,
});