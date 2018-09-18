// import { combineReducers } from 'redux';
import { CURRENT_LIST_ACTIONS } from '../actions/currentListActions';

const currentList = (state = [], action) => {
  switch(action.type) {
    case CURRENT_LIST_ACTIONS.SET_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default currentList;