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

// combine all saga
function* storesSaga() {
  yield takeEvery(STORE_ACTIONS.FETCH_USER_STORES, fetchUserStores);
  yield takeEvery(STORE_ACTIONS.UPDATE_STORE_NAME, updateStoreName);
}

export default storesSaga;