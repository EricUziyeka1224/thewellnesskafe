import { fork, takeLatest, put, call } from 'redux-saga/effects'
import * as types from '../Action/ActionTypes'
import { getUnreadNotificationCount, postOnesignalId, getPrivacyInfo } from '../Service'
import LoginSaga from '../LoginScreen/Sagas'
import CampaignSaga from '../OngoingCampaignScreen/Sagas'
import SocialSaga from '../SocialScreen/Sagas'
import ProfileSaga from '../ProfileScreen/Sagas'
import SignUpSaga from '../SignupScreen/Sagas'
import NotificationSaga from '../NotificationScreens/Sagas'

export default function* root() {
    yield takeLatest(types.GET_NOTIFICATION_UNREAD_COUNT_REQUEST, loadUnreadNotificationCount);
    yield takeLatest(types.REGISTER_ONESIGNAL_ID_REQUEST, registerOneSignalId);
    yield takeLatest(types.GET_PRIVACY_INFO, loadPrivacyInfo);
    yield fork(LoginSaga)
    yield fork(CampaignSaga)
    yield fork(SocialSaga)
    yield fork(ProfileSaga)
    yield fork(SignUpSaga)
    yield fork(NotificationSaga)
}

function* loadUnreadNotificationCount(action) {
    try {
        const res = yield call(getUnreadNotificationCount, action.payload.userId)
        const notificationCount = res.data.count;
        yield put({ type: types.GET_NOTIFICATION_UNREAD_COUNT_SUCCESS,  payload: { notificationCount } })     
    } catch (e) {
        yield put({type: types.GET_NOTIFICATION_UNREAD_COUNT_FAILED})
    }
}

function* loadPrivacyInfo(action) {
    try {
        const res = yield call(getPrivacyInfo)
        yield put({ type: types.GET_PRIVACY_INFO_SUCCESS,  payload: { data : res.data } })  
    } catch (e) {
        yield put({type: types.GET_PRIVACY_INFO_FAILED})
    }
}

function* registerOneSignalId(action) {
    try {
        yield call(postOnesignalId, { userId: action.payload.userId, deviceId: action.payload.deviceId })
    } catch (e) {
        yield put({type: types.REGISTER_ONESIGNAL_ID_FAILED})
    }
}