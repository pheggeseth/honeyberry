import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import items from './itemsReducer';
import categories from './categoryReducer';
import userStores from './userStoresReducer';
import currentStore from './currentStoreReducer';
import itemSearch from './itemSearchReducer';
import itemSelect from './itemSelectReducer';

const store = combineReducers({
  user,
  login,
  items,
  categories,
  userStores,
  currentStore,
  itemSearch,
  itemSelect,
});

export default store;
