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
    const itemToComplete = action.payload;
    const existingCompletedItem = action.list.find(item => item.completed && item.item_id === itemToComplete.item_id);

    // if there is already an existing copy of this item that has been completed,
    // combine the two items together into one with a combined quantity, update to the server
    if (existingCompletedItem) {
      existingCompletedItem.quantity += itemToComplete.quantity;
      yield put({
        type: CURRENT_STORE_ACTIONS.UPDATE_ITEM_QUANTITY,
        payload: existingCompletedItem
      });
      yield put({
        type: CURRENT_STORE_ACTIONS.REMOVE_ITEM,
        payload: itemToComplete,
      })
      // otherwise, complete the item as usual
    } else {
      const data = {
        id: itemToComplete.id,
        completed: itemToComplete.completed
      };
      yield call(axios.put, '/api/store/item/completed', data);
      yield put({
        type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
        payload: itemToComplete.store_id
      });
    }
  } catch(error) {
    console.log('completeItem saga error:', error);
  }
}

function* uncompleteItem(action) {
  try {
    const itemToUncomplete = action.payload;
    const data = {
      id: itemToUncomplete.id,
      completed: false
    };
    yield call(axios.put, '/api/store/item/completed', data);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
      payload: itemToUncomplete.store_id
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

function* updateEssentialsList(action) {
  try {
    const {storeId, list} = action.payload;
    // console.log('update essentials:', list);
    yield call(axios.post, `/api/store/${storeId}/essentials`, list);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_STORE_ESSENTIALS,
      payload: storeId
    });
  } catch(error) {
    console.log('updateEssentialsList saga error:', error);
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

function* moveSelectedItemsToTargetStore(action) {
  try {
    const selectedItems = action.payload.selectedItems;
    const currentStoreId = action.payload.currentStoreId;
    const newStoreId = action.payload.newStoreId;
    const data = {
      selectedItems,
      newStoreId
    };
    yield call(axios.put, `/api/store/${currentStoreId}/items/move`, data);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
      payload: currentStoreId,
    });
  } catch(error) {
    console.log('moveSelectedItemsToOtherStore saga error:', error);
  }
}

function* deleteSelectedItemsFromStore(action) {
  try {
    const data = {
      selectedItems: action.payload.selectedItems
    };
    yield call(axios.delete, '/api/store/items/delete', {data});
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
      payload: action.payload.storeId
    });
  } catch(error) {
    console.log('removeSelectedItemsFromStore:', error);
  }
}

function* fetchStoreAreas(action) {
  try {
    const storeId = action.payload;
    const responseAreas = yield call(axios.get, `/api/store/${storeId}/areas`);
    yield put({
      type: CURRENT_STORE_ACTIONS.SET_STORE_AREAS,
      payload: responseAreas.data
    });
  } catch(error) {
    console.log('fetchStoreAreas saga error:', error);
  }
}

function* updateAreaItems(action) {
  try {
    const {storeId, areaId, items} = action.payload;
    yield call(axios.post, `/api/store/area/${areaId}/items`, items);
    yield put({
      type: CURRENT_STORE_ACTIONS.FETCH_STORE_AREAS,
      payload: storeId
    });
  } catch(error) {
    console.log('updateAreaItems saga error:', error);
  }
}

function* currentStoreSaga() {
  yield takeEvery(CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS, fetchItemsInCurrentStore);
  yield takeEvery(CURRENT_STORE_ACTIONS.FETCH_STORE_ESSENTIALS, fetchCurrentStoreEssentialItems);
  yield takeEvery(CURRENT_STORE_ACTIONS.COMPLETE_ITEM, completeItem);
  yield takeEvery(CURRENT_STORE_ACTIONS.UNCOMPLETE_ITEM, uncompleteItem);
  yield takeEvery(CURRENT_STORE_ACTIONS.UPDATE_ITEM_QUANTITY, updateItemQuantity);
  yield takeEvery(CURRENT_STORE_ACTIONS.CLEAR_COMPLETED, clearCompletedItems);
  yield takeEvery(CURRENT_STORE_ACTIONS.ADD_ITEM, addListItem);
  yield takeEvery(CURRENT_STORE_ACTIONS.UPDATE_ESSENTIALS_LIST, updateEssentialsList);
  yield takeEvery(CURRENT_STORE_ACTIONS.REMOVE_ITEM, removeItem);
  yield takeEvery(CURRENT_STORE_ACTIONS.MOVE_SELECTED_ITEMS_TO_TARGET_STORE, moveSelectedItemsToTargetStore);
  yield takeEvery(CURRENT_STORE_ACTIONS.DELETE_SELECTED_ITEMS_FROM_STORE, deleteSelectedItemsFromStore);
  yield takeEvery(CURRENT_STORE_ACTIONS.FETCH_STORE_AREAS, fetchStoreAreas);
  yield takeEvery(CURRENT_STORE_ACTIONS.UPDATE_AREA_ITEMS, updateAreaItems);
}

export default currentStoreSaga;