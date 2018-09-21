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

const editingEssentials = (state = false, action) => {
  if (action.type === CURRENT_STORE_ACTIONS.TOGGLE_ESSENTIALS_EDITING_MODE) {
    return !state;
  } else {
    return state;
  }
};

const selectingItems = (state = false, action) => {
  if (action.type === CURRENT_STORE_ACTIONS.TOGGLE_ITEM_SELECTION_MODE) {
    return !state;
  } else {
    return state;
  }
};

const selectedItems = (state = [], action) => {
  switch(action.type) {
    case CURRENT_STORE_ACTIONS.SET_SELECTED_ITEMS:
      return action.payload;
    case CURRENT_STORE_ACTIONS.CLEAR_SELECTED_ITEMS:
      return [];
    case CURRENT_STORE_ACTIONS.ADD_TO_SELECTED_ITEMS:
      return [...state, action.payload];
    case CURRENT_STORE_ACTIONS.REMOVE_FROM_SELECTED_ITEMS:
      return state.filter(item => (item.item_id || item.id) !== (action.payload.item_id || action.payload.id));
    default:
      return state;
  }
};

const editingItem = (state = false, action) => {
  if (action.type === CURRENT_STORE_ACTIONS.TOGGLE_ITEM_EDITING_MODE) {
    return !state;
  } else {
    return state;
  }
};

const itemToEdit = (state = {}, action) => {
  if (action.type === CURRENT_STORE_ACTIONS.SET_EDITING_ITEM) {
    return {...action.payload}
  } else if (action.type === CURRENT_STORE_ACTIONS.CLEAR_EDITING_ITEM) {
    return {};
  } else {
    return state;
  }
}

// IMPORTED TO MAIN REDUX STORE AS "currentStore"
export default combineReducers({
  store,
  list,
  essentials,
  editingEssentials,
  editingItem,
  itemToEdit,
  selectingItems,
  selectedItems,
});