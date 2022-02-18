import * as types from '../Actions/ActionTypes'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    accountInfo: null
}

function profileReducer(state = initialState, action) {
    switch(action.type) {
        case types.PROFILE_UPDATE_PENDING: 
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isFailed: false
            }
        case types.PROFILE_UPDATE_SUCCESS: 
        console.log("******************************************************************update success**********************************")
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                isFailed: false,
                accountInfo: action.payload.accountInfo
            }
        case types.PROFILE_UPDATE_FAILURE: 
        console.log("******************************************************************update failure**********************************")
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                isFailed: true
            }
        default:
            return {
                ...state
            }
    }
}

export default profileReducer