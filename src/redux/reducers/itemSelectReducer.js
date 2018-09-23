import { combineReducers } from 'redux';
import { ITEM_SELECT_ACTIONS } from '../actions/itemSelectActions';

const selectingItems = (state = false, action) => {
  if (action.type === ITEM_SELECT_ACTIONS.START_ITEM_SELECTION_MODE) {
    return true;
  } else if (action.type === ITEM_SELECT_ACTIONS.STOP_ITEM_SELECTION_MODE) {
    return false;
  } else {
    return state;
  }
};

const selectedItems = (state = [], action) => {
  switch(action.type) {
    case ITEM_SELECT_ACTIONS.SET_SELECTED_ITEMS:
      return action.payload;
    case ITEM_SELECT_ACTIONS.CLEAR_SELECTED_ITEMS:
      return [];
    case ITEM_SELECT_ACTIONS.ADD_TO_SELECTED_ITEMS:
      return [...state, action.payload];
    case ITEM_SELECT_ACTIONS.REMOVE_FROM_SELECTED_ITEMS:
      return state.filter(item => (item.item_id || item.id) !== (action.payload.item_id || action.payload.id));
    default:
      return state;
  }
};

export default combineReducers({
  selectingItems,
  selectedItems
});