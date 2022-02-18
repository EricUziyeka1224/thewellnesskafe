import * as types from '../Actions/ActionTypes'

const initialState = {
    isLoading: false,
    isRegisterd: false,
    isFailed: false
}

function signUpReducer(state = initialState, action) {
    switch(action.type) {
        case types.REGISTER_PENDING: 
            return {
                ...state,
                isLoading: true,
                isFailed: false
            }
        case types.REGISTER_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                isRegisterd: true,
                isFailed: false
            }
        case types.REGISTER_FAILURE: 
            return {
                ...state,
                isLoading: false,
                isRegisterd: false,
                isFailed: true
            }
        default:
            return {
                ...state,
                isFailed: false
            }
    }
}

export default signUpReducer