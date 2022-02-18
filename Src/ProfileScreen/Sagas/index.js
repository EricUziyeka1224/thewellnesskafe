import * as types from '../Actions/ActionTypes'
import { call, takeLatest, put } from 'redux-saga/effects'
import { postUpdateProfile } from '../Services'
import { NavigationActions } from 'react-navigation'

export default function* watcher() {
    yield takeLatest(types.PROFILE_UPDATE_REQUEST, updateProfile);
}

function* updateProfile(action) {
    try {
        const { userId, image, name, email, phone, password, state, city } = action.payload
        const accountInfo = yield call(postUpdateProfile, { userId, image, name, email, phone, password, state, city })
        yield put({ type: types.PROFILE_UPDATE_SUCCESS, payload: { accountInfo } })                  
    } catch (e) {
        console.log(e)
        yield put({type: types.PROFILE_UPDATE_FAILURE})
    }
}