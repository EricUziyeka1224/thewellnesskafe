import * as types from './ActionTypes'

export function tryLogin(email, password) {
    return {
        type: types.LOGIN_REQUEST,
        payload: { email, password }
    }
}