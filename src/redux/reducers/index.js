import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import items from './itemReducer';
import categories from './categoryReducer';
import userStores from './userStoresReducer';
import currentStore from './currentStoreReducer';
import itemSearch from './itemSearchReducer';

const store = combineReducers({
  user,
  login,
  items,
  categories,
  userStores,
  currentStore,
  itemSearch,
});

export default store;
