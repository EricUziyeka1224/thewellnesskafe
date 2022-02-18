import * as types from '../Actions/ActionTypes'
import * as appTypes  from '../../Action/ActionTypes'

const initialState = {
    isLoading: false,
    campaigns: [],
    isFailed: false,
    isError: false,
    selectedCamapagin: null
}

function campaignReducer(state = initialState, action) {
    switch(action.type) {
        case types.CAMPAIGN_LOAD_LIST_PENDING: 
            return {
                ...state,
                isLoading: true,
                isFailed: false
            }
        case types.CAMPAIGN_LOAD_LIST_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                campaigns: action.payload.campaigns == undefined ? [] : action.payload.campaigns,
                isFailed: false
            }
        case types.CAMPAIGN_LOAD_LIST_FAILURE: 
            return {
                ...state,
                isLoading: false,
                isFailed: true
            }
        case appTypes.GET_USER_ID_ASYNC_STORAGE_FAILED: 
            return {
                ...state,
                isError: true,
                isFailed: false
            }
        case types.CAMPAIGN_SELECT_ITEM_REQUEST:
            return {
                ...state,
                selectedCamapagin: action.payload.campgign
            }
        default:
            return {
                ...state
            }
    }
}

export default campaignReducer