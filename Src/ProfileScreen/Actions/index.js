import * as types from './ActionTypes'

export function updateProfile(userId, image, name, email, phone, password, state, city) {
    return {
        type: types.PROFILE_UPDATE_REQUEST,
        payload: { userId, image, name, email, phone, password, state, city }
    }
}