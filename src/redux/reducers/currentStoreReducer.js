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
  if (action.type === CURRENT_STORE_ACTIONS.START_ESSENTIALS_EDITING_MODE) {
    return true;
  } else if (action.type === CURRENT_STORE_ACTIONS.STOP_ESSENTIALS_EDITING_MODE) {
    return false;
  } else {
    return state;
  }
};

const editingItem = (state = false, action) => {
  if (action.type === CURRENT_STORE_ACTIONS.START_ITEM_EDITING_MODE) {
    return true;
  } else if (action.type === CURRENT_STORE_ACTIONS.STOP_ITEM_EDITING_MODE) {
    return false;
  } else {
    return state;
  }
};

const itemToEdit = (state = {}, action) => {
  switch(action.type) {
    case CURRENT_STORE_ACTIONS.SET_EDITING_ITEM:
      return {...action.payload};
    case CURRENT_STORE_ACTIONS.CLEAR_EDITING_ITEM:
      return {};
    case CURRENT_STORE_ACTIONS.UPDATE_EDITING_ITEM_QUANTITY:
      return {...state, quantity: action.payload};
    case CURRENT_STORE_ACTIONS.UPDATE_EDITING_ITEM_UNIT:
      return {...state, unit: action.payload};
    default:
      return state;
  }
};

const editingList = (state = false, action) => {
  if (action.type === CURRENT_STORE_ACTIONS.START_LIST_EDITING_MODE) {
    return true;
  } else if (action.type === CURRENT_STORE_ACTIONS.STOP_LIST_EDITING_MODE) {
    return false;
  } else {
    return state;
  }
};

const movingItems = (state = false, action) => {
  if (action.type === CURRENT_STORE_ACTIONS.START_ITEM_MOVE_MODE) {
    return true;
  } else if (action.type === CURRENT_STORE_ACTIONS.STOP_ITEM_MOVE_MODE) {
    return false;
  } else {
    return state;
  }
};

const itemMoveTargetStore = (state = null, action) => {
  if (action.type === CURRENT_STORE_ACTIONS.SET_ITEM_MOVE_TARGET_STORE) {
    return action.payload;
  } else if (action.type === CURRENT_STORE_ACTIONS.CLEAR_ITEM_MOVE_TARGET_STORE) {
    return null;
  } else {
    return state;
  }
};

const deletingItems = (state = false, action) => {
  if (action.type === CURRENT_STORE_ACTIONS.START_ITEM_DELETE_MODE) {
    return true;
  } else if (action.type === CURRENT_STORE_ACTIONS.STOP_ITEM_DELETE_MODE) {
    return false;
  } else {
    return state;
  }
};

const editingStoreSettings = (state = false, action) => {
  if (action.type === CURRENT_STORE_ACTIONS.START_STORE_SETTINGS_EDIT) {
    return true;
  } else if (action.type === CURRENT_STORE_ACTIONS.STOP_STORE_SETTINGS_EDIT) {
    return false;
  } else {
    return state;
  }
};

const editingAreaId = (state = null, action) => {
  if (action.type === CURRENT_STORE_ACTIONS.START_AREA_EDITING_MODE) {
    return action.payload;
  } else if (action.type === CURRENT_STORE_ACTIONS.STOP_AREA_EDITING_MODE) {
    return null;
  } else {
    return state;
  }
};

const areas = (state = [], action) => {
  if (action.type === CURRENT_STORE_ACTIONS.SET_STORE_AREAS) {
    return action.payload;
  } else {
    return state;
  }
};

// IMPORTED TO MAIN REDUX STORE AS "currentStore"
export default combineReducers({
  store,
  list,
  essentials,
  editingEssentials,
  editingItem,
  itemToEdit,
  editingList,
  movingItems,
  itemMoveTargetStore,
  deletingItems,
  editingStoreSettings,
  editingAreaId,
  areas,
});