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
    console.log('fetchItemsInCurrentStore saga error:', error);
  }
}

function* updateCurrentListItem(action) {
  try {
    const itemToUpdate = action.payload;
    yield call(axios.put, `/api/store/item`, itemToUpdate);
    yield put({
      type: CURRENT_LIST_ACTIONS.FETCH_LIST_ITEMS, 
      payload: itemToUpdate.store_id
    });
  } catch(error) {
    console.log('toggleItemCompleted saga error:', error);
  }
}

function* clearCompletedItems(action) {
  try {
    const storeId = action.payload;
    yield call(axios.delete, `/api/store/${storeId}/items/completed`);
    yield put({
      type: CURRENT_LIST_ACTIONS.FETCH_LIST_ITEMS,
      payload: storeId
    });
  } catch(error) {
    console.log('clearCompletedItems saga error:', error);
  }
}

function* currentListSaga() {
  yield takeEvery(CURRENT_LIST_ACTIONS.FETCH_LIST_ITEMS, fetchItemsInCurrentStore);
  yield takeEvery(CURRENT_LIST_ACTIONS.UPDATE_ITEM, updateCurrentListItem);
  yield takeEvery(CURRENT_LIST_ACTIONS.CLEAR_COMPLETED, clearCompletedItems);
}

export default currentListSaga;