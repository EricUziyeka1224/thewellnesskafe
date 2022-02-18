import * as types from '../Action/ActionTypes'

const initialState = {
    notificationCount: 0,
    data: null
}

function appReducer(state = initialState, action) {
    switch(action.type) {
        case types.GET_NOTIFICATION_UNREAD_COUNT_SUCCESS: 
            return {
                ...state,
                notificationCount: action.payload.notificationCount,
                data : null
            }
        case types.GET_NOTIFICATION_UNREAD_COUNT_FAILED: 
            return {
                ...state,
                notificationCount: 0,
                data : null
            }
        case types.SET_READ_ALL_NOTIFICATION:
            return {
                ...state,
                notificationCount: 0,
                data : null
            }       
        case types.GET_PRIVACY_INFO_SUCCESS:
            return {
                 ...state,
                data: action.payload.data
            }     
        default:
            return {
                ...state,
                data: null
            }
    }
}

export default appReducer