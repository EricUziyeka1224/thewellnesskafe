import * as types from '../Actions/ActionTypes'
import { call, takeLatest, put } from 'redux-saga/effects'
import { getNotificationList } from '../Services'
import * as appTypes  from '../../Action/ActionTypes'

export default function* watcher() {
    yield takeLatest(types.NOTIFICATION_LOAD_LIST_REQUEST, loadNotificationList);
}

function* loadNotificationList(action) {
    try {
        const userId = action.payload.userId  
        const res = yield call(getNotificationList, userId)
        const notifications = res.data;
        //dispatch success with the array data
        yield put({ type: types.NOTIFICATION_LOAD_LIST_SUCCESS,  payload: { notifications } })     
    } catch (e) {
        yield put({type: types.NOTIFICATION_LOAD_LIST_FAILURE})
    }
}