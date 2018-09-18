import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { CURRENT_LIST_ACTIONS } from '../actions/currentListActions';

function* fetchItemsInCurrentStore(action) {
  try {
    const storeId = action.payload;
    const responseItems = yield call(axios.get, `/api/store/${storeId}/items`);
    const responseAction = {
      type: CURRENT_LIST_ACTIONS.SET_LIST,
      payload: responseItems.data
    };
    yield put(responseAction);
  } catch(error) {
    console.log('error fetching items in current store:', error);
  }
}

function* currentListSaga() {
  yield takeEvery(CURRENT_LIST_ACTIONS.FETCH_LIST_ITEMS, fetchItemsInCurrentStore);
}

export default currentListSaga;