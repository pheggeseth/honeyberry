import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import userStores from './userStoresReducer';
import currentStore from './currentStoreReducer';

const store = combineReducers({
  user,
  login,
  userStores,
  currentStore,
});

export default store;
