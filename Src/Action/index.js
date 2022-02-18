import * as types from './ActionTypes'
import { AsyncStorage } from 'react-native'

export function loadUnreadNotificationCount(userId) {
    
    return {
        type: types.GET_NOTIFICATION_UNREAD_COUNT_REQUEST,
        payload: {userId}
    }  
}

export function registerOneSignalId(userId, deviceId) {
    
    return {
        type: types.REGISTER_ONESIGNAL_ID_REQUEST,
        payload: {userId, deviceId}
    }  
}

export function setReadAllNotification() {
    
    return {
        type: types.SET_READ_ALL_NOTIFICATION
    }  
}

export function getPrivacyInfo() {
    
    return {
        type: types.GET_PRIVACY_INFO
    }  
}