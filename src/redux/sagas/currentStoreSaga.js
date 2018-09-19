import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { CURRENT_STORE_ACTIONS } from '../actions/currentStoreActions';

function* fetchItemsInCurrentStore(action) {
  try {
    const storeId = action.payload;
    const responseItems = yield call(axios.get, `/api/store/${storeId}/items`);
    const responseAction = {
      type: CURRENT_STORE_ACTIONS.SET_LIST,
      payload: responseItems.data
    };
    yield put(responseAction);
  } catch(error) {
    console.log('fetchItemsInCurrentStore saga error:', error);
  }
}

function* fetchCurrentStoreEssentialItems(action) {
  try {
    const storeId = action.payload;
    const responseItems = yield call(axios.get, `/api/store/${storeId}/essentials`);
    const responseAction = {
      type: CURRENT_STORE_ACTIONS.SET_STORE_ESSENTIALS,
      payload: responseItems.data
    };
    yield put(responseAction);
  } catch(error) {
    console.log('fetchCurrentStoreEssentialItems saga error:', error);
  }
}

function* addListItem(action) {
  try {
    const storeId = action.payload.storeId;
    const itemToAdd = action.payload.item;
    yield call(axios.post, `/api/store/${storeId}/item`, itemToAdd);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
      payload: storeId
    });
  } catch(error) {
    console.log('addListItem saga error:', error);
  }
}

function* updateItemCompletedStatus(action) {
  try {
    const data = {
      id: action.payload.id,
      completed: action.payload.completed
    };
    yield call(axios.put, '/api/store/item/completed', data);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
      payload: action.payload.store_id
    });
  } catch(error) {
    console.log('updateItemCompletedStatus saga error:', error);
  }
}

function* updateItemQuantity(action) {
  try {
    const data = {
      id: action.payload.id,
      quantity: action.payload.quantity
    };
    yield call(axios.put, '/api/store/item/quantity', data);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
      payload: action.payload.store_id
    });
  } catch(error) {
    console.log('updateItemQuantity saga error:', error);
  }
}

function* clearCompletedItems(action) {
  try {
    const storeId = action.payload;
    yield call(axios.delete, `/api/store/${storeId}/items/completed`);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
      payload: storeId
    });
  } catch(error) {
    console.log('clearCompletedItems saga error:', error);
  }
}

function* currentStoreSaga() {
  yield takeEvery(CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS, fetchItemsInCurrentStore);
  yield takeEvery(CURRENT_STORE_ACTIONS.FETCH_STORE_ESSENTIALS, fetchCurrentStoreEssentialItems);
  yield takeEvery(CURRENT_STORE_ACTIONS.UPDATE_ITEM_COMPLETED, updateItemCompletedStatus);
  yield takeEvery(CURRENT_STORE_ACTIONS.UPDATE_ITEM_QUANTITY, updateItemQuantity);
  yield takeEvery(CURRENT_STORE_ACTIONS.CLEAR_COMPLETED, clearCompletedItems);
  yield takeEvery(CURRENT_STORE_ACTIONS.ADD_ITEM, addListItem);
}

export default currentStoreSaga;