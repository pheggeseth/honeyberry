import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { ITEM_ACTIONS } from '../actions/itemActions';

function* fetchAllItems() {
  const responseItems = yield call(axios.get, '/api/item');
  const responseAction = {
    type: ITEM_ACTIONS.SET_ALL_ITEMS,
    payload: responseItems.data
  };
  yield put(responseAction);
}

function* itemSaga() {
  yield takeEvery(ITEM_ACTIONS.FETCH_ALL_ITEMS, fetchAllItems);
}

export default itemSaga;