import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { CATEGORY_ACTIONS } from '../actions/categoryActions';

function* fetchAllCategories(action) {
  try {
    const categoriesFromServer = yield call(axios.get, '/api/category');
    const responseAction = {
      type: CATEGORY_ACTIONS.SET_ALL_CATEGORIES,
      payload: categoriesFromServer.data
    };
    yield put(responseAction);
  } catch(error) {
    console.log('fetchAllCategories saga error:', error);
  }
}

function* categorySaga() {
  yield takeEvery(CATEGORY_ACTIONS.FETCH_ALL_CATEGORIES, fetchAllCategories);
}

export default categorySaga;