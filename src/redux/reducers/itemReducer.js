import { combineReducers } from 'redux';
import { ITEM_ACTIONS } from '../actions/itemActions';

const items = (state = [], action) => {
  switch(action.type) {
    case ITEM_ACTIONS.SET_ALL_ITEMS:
      return action.payload;
    default:
      return state;
  }
};

export default items;