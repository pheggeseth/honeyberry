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
    const item = action.payload.item;
    yield call(axios.post, `/api/store/${storeId}/item`, item);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
      payload: storeId
    });
  } catch(error) {
    console.log('addListItem saga error:', error);
  }
}

function* completeItem(action) {
  try {
    const completedItem = action.payload;
    const existingCompletedItem = action.list.find(item => item.completed && item.item_id === completedItem.item_id);
    if (existingCompletedItem) {
      existingCompletedItem.quantity += 1;
      yield put({
        type: CURRENT_STORE_ACTIONS.UPDATE_ITEM_QUANTITY,
        payload: existingCompletedItem
      });
      yield put({
        type: CURRENT_STORE_ACTIONS.REMOVE_ITEM,
        payload: completedItem,
      })
    } else {
      const data = {
        id: completedItem.id,
        completed: completedItem.completed
      };
      yield call(axios.put, '/api/store/item/completed', data);
      yield put({
        type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
        payload: completedItem.store_id
      });
    }
  } catch(error) {
    console.log('completeItem saga error:', error);
  }
}

function* uncompleteItem(action) {
  try {
    const uncompletedItem = action.payload;
    const data = {
      id: uncompletedItem.id,
      completed: uncompletedItem.completed
    };
    yield call(axios.put, '/api/store/item/completed', data);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
      payload: uncompletedItem.store_id
    });
  } catch(error) {
    console.log('uncompleteItem saga error:', error);
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

function* addEssentialItem(action) {
  try {
    const storeId = action.payload.storeId;
    const item = action.payload;
    console.log('itemId:', item);
    yield call(axios.post, `/api/store/essential`, item);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_STORE_ESSENTIALS,
      payload: storeId
    });
  } catch(error) {
    console.log('addEssentialItem saga error:', error);
  }
}

function* removeEssentialItem(action) {
  try {
    const storeId = action.payload.store_id;
    const essentialId = action.payload.id;
    yield call(axios.delete, '/api/store/essential/'+essentialId);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_STORE_ESSENTIALS,
      payload: storeId
    });
  } catch(error) {
    console.log('removeEssentialItem saga error:', error);
  }
}

function* removeItem(action) {
  try {
    const itemId = action.payload.id;
    const storeId = action.payload.store_id;
    yield call(axios.delete, '/api/store/item/'+itemId);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
      payload: storeId,
    });
  } catch(error) {
    console.log('removeItem saga error:', error);
  }
}

function* currentStoreSaga() {
  yield takeEvery(CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS, fetchItemsInCurrentStore);
  yield takeEvery(CURRENT_STORE_ACTIONS.FETCH_STORE_ESSENTIALS, fetchCurrentStoreEssentialItems);
  // yield takeEvery(CURRENT_STORE_ACTIONS.UPDATE_ITEM_COMPLETED, updateItemCompletedStatus);
  yield takeEvery(CURRENT_STORE_ACTIONS.COMPLETE_ITEM, completeItem);
  yield takeEvery(CURRENT_STORE_ACTIONS.UNCOMPLETE_ITEM, uncompleteItem);
  yield takeEvery(CURRENT_STORE_ACTIONS.UPDATE_ITEM_QUANTITY, updateItemQuantity);
  yield takeEvery(CURRENT_STORE_ACTIONS.CLEAR_COMPLETED, clearCompletedItems);
  yield takeEvery(CURRENT_STORE_ACTIONS.ADD_ITEM, addListItem);
  yield takeEvery(CURRENT_STORE_ACTIONS.ADD_ESSENTIAL_ITEM, addEssentialItem);
  yield takeEvery(CURRENT_STORE_ACTIONS.REMOVE_ESSENTIAL_ITEM, removeEssentialItem);
  yield takeEvery(CURRENT_STORE_ACTIONS.REMOVE_ITEM, removeItem);
}

export default currentStoreSaga;