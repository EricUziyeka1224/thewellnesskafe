import * as types from '../Actions/ActionTypes'
import { call, takeLatest, put } from 'redux-saga/effects'
import { getSocialList, postNewSocial, getDoLike, getDoDisLike, postNewComment } from '../Services'

export default function* watcher() {
    yield takeLatest(types.SOCIAL_LOAD_LIST_REQUEST, loadSocialList);
    yield takeLatest(types.SOCIAL_NEW_POST_REQUEST, postNew);
    yield takeLatest(types.SOCIAL_LIKE_REQUEST, doLike);
    yield takeLatest(types.SOCIAL_DISLIKE_REQUEST, doDisLike);
    yield takeLatest(types.SOCIAL_NEW_COMMENT_REQUEST, commentNew);
}

function* loadSocialList(action) {
    try {
        yield put({ type: types.SOCIAL_LOAD_LIST_PENDING })
        //call api : getSocialList
        const socialRes = yield call(getSocialList)
        const socials = socialRes.data;
        //dispatch success with the array data
        yield put({ type: types.SOCIAL_LOAD_LIST_SUCCESS,  payload: { socials } })     
    } catch (e) {
        yield put({type: types.SOCIAL_LOAD_LIST_FAILURE})
    }
}

function* postNew(action) {
    try {
        const {userId, avatarSource, text, video} = action.payload
        //call api : post new social
        const res = yield call(postNewSocial, {userId, avatarSource, text, video})
        const newSocial = res.data;
        //dispatch success with the array data
        yield put({ type: types.SOCIAL_NEW_POST_SUCCESS,  payload: { newSocial } })     
    } catch (e) {
        yield put({type: types.SOCIAL_NEW_POST_FAILURE})
    }
}

function* doLike(action) {
    try {
        const { likeIndex, userId, socialId } = action.payload
        yield call(getDoLike, { userId, socialId })
        yield put({ type: types.SOCIAL_LIKE_SUCCESS,  payload: { likeIndex, userId, socialId } })     
    } catch (e) {
        yield put({type: types.SOCIAL_LIKE_FAILURE})
    }
}

function* doDisLike(action) {
    try {
        const { likeIndex, userId, socialId } = action.payload
        yield call(getDoDisLike, { userId, socialId })
        yield put({ type: types.SOCIAL_DISLIKE_SUCCESS,  payload: { likeIndex, userId, socialId } })     
    } catch (e) {
        yield put({type: types.SOCIAL_DISLIKE_FAILURE})
    }
}

function* commentNew(action) {
    try {
        const {userId, socialId, text} = action.payload
        //call api : post new social
        const res = yield call(postNewComment, {userId, socialId, text})
        const {userName, userImage} = res.data
        //dispatch success with the array data
        console.log("************************************************************************************************")
        yield put({ type: types.SOCIAL_NEW_COMMENT_SUCCESS,  payload: {userName, userImage, text} })     
    } catch (e) {
        yield put({type: types.SOCIAL_NEW_COMMENT_FAILURE})
    }
}