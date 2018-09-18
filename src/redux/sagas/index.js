import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import itemSaga from './itemSaga';
import categorySaga from './categorySaga';
import storesSaga from './storesSaga';
import currentStoreSaga from './currentStoreSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    itemSaga(),
    categorySaga(),
    storesSaga(),
    currentStoreSaga(),
    // watchIncrementAsync()
  ]);
}
