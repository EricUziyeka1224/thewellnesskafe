import * as types from '../Actions/ActionTypes'

import { call, takeLatest, put } from 'redux-saga/effects'
import { postLogin } from '../Services'

export default function* watcher() {
    yield takeLatest(types.LOGIN_REQUEST, tryLogin);
}

function* tryLogin(action) {
    try {
        const { email, password } = action.payload
        const accountInfo = yield call(postLogin, { email, password })
        yield put({ type: types.LOGIN_SUCCESS,  payload: { accountInfo } })  
        
    } catch (e) {
        console.log("here");
        yield put({type: types.LOGIN_FAILURE})
    }
}