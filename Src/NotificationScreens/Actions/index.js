import * as types from './ActionTypes'
import { AsyncStorage } from 'react-native'

export function loadNotifications(userId) {
    
        return {
            type: types.NOTIFICATION_LOAD_LIST_REQUEST,
            payload: {userId}
        }  
}