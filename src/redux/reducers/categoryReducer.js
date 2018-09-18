// import { combineReducers } from 'redux';
import { CATEGORY_ACTIONS } from '../actions/categoryActions';

const categories = (state = [], action) => {
  switch(action.type) {
    case CATEGORY_ACTIONS.SET_ALL_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export default categories;