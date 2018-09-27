import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { STORE_ACTIONS } from '../actions/storeActions';

// this saga will get all of the stores that belong to the logged in user
// and store those stores back in redux
function* fetchUserStores() {
  try {
    const storesResponse = yield call(axios.get, '/api/store');
    const responseAction = {
      type: STORE_ACTIONS.SET_USER_STORES,
      payload: storesResponse.data
    };
    yield put(responseAction);
  } catch(error) {
    console.log('error fetching user stores:', error);
  }
}

function* updateStoreName(action) {
  try {
    const {storeId, newName} = action.payload;
    yield call(axios.put, `/api/store/${storeId}/name`, {newName});
    yield put({type: STORE_ACTIONS.FETCH_USER_STORES});
  } catch(error) {
    console.log('updateStoreName saga error:', error);
  }
}

function* addNewStore(action) {
  try {
    const name = action.payload;
    yield call(axios.post, '/api/store', {name});
    yield put({type: STORE_ACTIONS.FETCH_USER_STORES});
  } catch(error) {
    console.log('addNewStore saga error:', error);
  }
}

function* deleteStore(action) {
  try {
    const storeId = action.payload;
    yield call(axios.delete, `/api/store/${storeId}`);
    yield put({type: STORE_ACTIONS.FETCH_USER_STORES});
  } catch(error) {
    console.log('deleteStore saga error:', error);
  }
}

// combine all saga
function* storesSaga() {
  yield takeEvery(STORE_ACTIONS.FETCH_USER_STORES, fetchUserStores);
  yield takeEvery(STORE_ACTIONS.UPDATE_STORE_NAME, updateStoreName);
  yield takeEvery(STORE_ACTIONS.ADD_NEW_STORE, addNewStore);
  yield takeEvery(STORE_ACTIONS.DELETE_STORE, deleteStore);
}

export default storesSaga;