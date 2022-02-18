import * as types from '../Actions/ActionTypes'

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    accountInfo: null,
    isFailed: false
}

function loginReducer(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN_PENDING: 
            return {
                ...state,
                isLoading: false,
                isFailed: false
            }
        case types.LOGIN_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                accountInfo: action.payload.accountInfo,
                isFailed: false
            }
        case types.LOGIN_FAILURE: 
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                isFailed: true
            }
        default:
            return {
                ...state,
                isAuthenticated: false,
                isFailed: false
            }
    }
}

export default loginReducer