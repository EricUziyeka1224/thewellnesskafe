import * as types from '../Actions/ActionTypes'
import { call, takeLatest, put } from 'redux-saga/effects'
import { postRegister } from '../Services'

export default function* watcher() {
    yield takeLatest(types.REGISTER_REQUEST, doRegister);
}

function* doRegister(action) {
    try {
        const { name, email, phone, password } = action.payload
        yield call(postRegister, { name, email, phone, password })
        yield put({ type: types.REGISTER_SUCCESS })  
    } catch (e) {
        yield put({type: types.REGISTER_FAILURE})
    }
}