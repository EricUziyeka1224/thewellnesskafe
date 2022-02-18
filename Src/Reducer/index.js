import { combineReducers } from 'redux';
import loginReducer from '../LoginScreen/Reducers'
import campaignReducer from '../OngoingCampaignScreen/Reducers'
import socialReducer from '../SocialScreen/Reducers'
import profileReducer from '../ProfileScreen/Reducers'
import signUpReducer from '../SignupScreen/Reducers'
import notificationReducer from '../NotificationScreens/Reducers'
import appReducer from './AppReducer'

const rootReducer = combineReducers({
    loginReducer,
    campaignReducer,
    socialReducer,
    profileReducer,
    signUpReducer,
    appReducer,
    notificationReducer
})

export default rootReducer;