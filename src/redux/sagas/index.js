import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import storesSaga from './storesSaga';
import currentListSaga from './currentListSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    storesSaga(),
    currentListSaga(),
    // watchIncrementAsync()
  ]);
}
