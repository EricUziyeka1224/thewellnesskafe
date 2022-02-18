import * as types from './ActionTypes'

export function loadSocialList() {
    return {
        type: types.SOCIAL_LOAD_LIST_REQUEST,
        payload: { }
    }
}

export function selectSocialItem(index) {
    return {
        type: types.SOCIAL_ITEM_SELECT_SUCCESS,
        payload: { index }
    }
}

export function postNew({userId, avatarSource, text, video}) {
    return {
        type: types.SOCIAL_NEW_POST_REQUEST,
        payload: { userId, avatarSource, text, video }
    }
}

export function doLike({likeIndex, userId, socialId}) {
    return {
        type: types.SOCIAL_LIKE_REQUEST,
        payload: { likeIndex, userId, socialId }
    }
}

export function doDisLike({likeIndex, userId, socialId}) {
    return {
        type: types.SOCIAL_DISLIKE_REQUEST,
        payload: { likeIndex, userId, socialId }
    }
}

export function setUserId(userId) {
    return {
        type: types.SOCIAL_SET_USER_ID,
        payload: { userId }
    }
}

export function commentNew({userId, socialId, text}) {
    return {
        type: types.SOCIAL_NEW_COMMENT_REQUEST,
        payload: { userId, socialId, text }
    }
}