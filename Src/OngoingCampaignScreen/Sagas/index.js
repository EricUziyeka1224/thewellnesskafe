import * as types from '../Actions/ActionTypes'
import { call, takeLatest, put } from 'redux-saga/effects'
import { getCampaignList } from '../Services'
import * as appTypes  from '../../Action/ActionTypes'
import { AsyncStorage } from 'react-native'

export default function* watcher() {
    yield takeLatest(types.CAMPAIGN_LOAD_LIST_REQUEST, loadCampaignList);
}

function* loadCampaignList(action) {
    try {

        const userId = action.payload.userId  
        
        

        const campaignRes = yield call(getCampaignList, userId)

console.log(campaignRes);
        console.log("userId___________________________")

        const campaigns = campaignRes.data;
        //dispatch success with the array data
        yield put({ type: types.CAMPAIGN_LOAD_LIST_SUCCESS,  payload: { campaigns } })     
    } catch (e) {
        yield put({type: types.CAMPAIGN_LOAD_LIST_FAILURE})
    }
}