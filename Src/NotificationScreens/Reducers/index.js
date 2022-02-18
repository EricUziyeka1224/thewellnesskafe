import * as types from '../Actions/ActionTypes'
import * as appTypes  from '../../Action/ActionTypes'

const initialState = {
    isLoading: false,
    notifications: [],
    isFailed: false
}

function notificationReducer(state = initialState, action) {
    switch(action.type) {
        case types.NOTIFICATION_LOAD_LIST_PENDING: 
            return {
                ...state,
                isLoading: true,
                isFailed: false
            }
        case types.NOTIFICATION_LOAD_LIST_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                notifications: action.payload.notifications == undefined ? [] : action.payload.notifications,
                isFailed: false
            }
        case types.NOTIFICATION_LOAD_LIST_FAILURE: 
            return {
                ...state,
                isLoading: false,
                isFailed: true
            }
        default:
            return {
                ...state
            }
    }
}

export default notificationReducer