import * as types from './ActionTypes'

export function doRegister(name, email, phone, password) {
    return {
        type: types.REGISTER_REQUEST,
        payload: { name, email, phone, password }
    }
}