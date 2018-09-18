import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import items from './itemReducer';
import categories from './categoryReducer';
import userStores from './userStoresReducer';
import currentStore from './currentStoreReducer';

const store = combineReducers({
  user,
  login,
  items,
  categories,
  userStores,
  currentStore,
});

export default store;
