import * as types from './ActionTypes'
import { AsyncStorage } from 'react-native'

export function loadCampaignList(userId) {
    
    
        return {
            type: types.CAMPAIGN_LOAD_LIST_REQUEST,
            payload: {userId}
        }  
}

export function selectCamapaignItem(campgign) {
    
    return {
        type: types.CAMPAIGN_SELECT_ITEM_REQUEST,
        payload: {campgign}
    }  
}