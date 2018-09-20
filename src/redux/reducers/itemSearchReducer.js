import { combineReducers } from 'redux';
import { ITEM_ACTIONS } from '../actions/itemActions';

const searching = (state = false, action) => {
  switch(action.type) {
    case ITEM_ACTIONS.START_ITEM_SEARCH_MODE:
      return true;
    case ITEM_ACTIONS.STOP_ITEM_SEARCH_MODE:
      return false;
    default:
      return state;
  }
};

// const searchTerm = (state = '', action) => {
//   switch(action.type) {
//     case ITEM_ACTIONS.SET_ITEM_SEARCH_TERM:
//       return action.payload;
//     default:
//       return state;
//   }
// };

export default combineReducers({
  searching,
  // searchTerm,
});