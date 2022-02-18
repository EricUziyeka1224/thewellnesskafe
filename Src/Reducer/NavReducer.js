import { AppNavigator } from '../../Navigator'

export const navReducer = (state, action) => { // passed to combineReducers()
    const newState = AppNavigator.router.getStateForAction(action, state)
    return newState || state
  }