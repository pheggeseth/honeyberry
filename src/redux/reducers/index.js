import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import stores from './storesReducer';
import currentList from './currentListReducer';

const store = combineReducers({
  user,
  login,
  stores,
  currentList,
});

export default store;
