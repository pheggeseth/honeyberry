import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import stores from './storesReducer';

const store = combineReducers({
  user,
  login,
  stores,
});

export default store;
