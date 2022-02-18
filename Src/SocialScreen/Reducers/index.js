import * as types from '../Actions/ActionTypes'
import * as appTypes  from '../../Action/ActionTypes'

const initialState = {
    isLoading: false,
    socials: [],
    isFailed: false,
    isError: false,
    selectedItem: -1,
    isPosted: false,
    userId: -1,
    isLiked: -1
}

function socialReducer(state = initialState, action) {
    switch(action.type) {
        case types.SOCIAL_LOAD_LIST_PENDING: 
            return {
                ...state,
                isLoading: true,
                isFailed: false
            }
        case types.SOCIAL_LOAD_LIST_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                socials: action.payload.socials == undefined ? [] : action.payload.socials,
                isFailed: false
            }
        case types.SOCIAL_LOAD_LIST_FAILURE: 
            return {
                ...state,
                isLoading: false,
                socials: [],
                isFailed: true
            }
        case types.SOCIAL_ITEM_SELECT_SUCCESS: 
            return {
                ...state,
                selectedItem: action.payload.index
            }
        case appTypes.GET_USER_ID_ASYNC_STORAGE_FAILED: 
            return {
                ...state,
                socials: [],
                isError: true,
                isFailed: false
            }
        case types.SOCIAL_NEW_POST_SUCCESS: 
            return {
                ...state,
                socials: [action.payload.newSocial, ...state.socials],
                isError: true,
                isFailed: false,
                isPosted: true
            }
        case types.SOCIAL_LIKE_SUCCESS: 
            const isLiked1 = 1
            state.socials[state.selectedItem].likes.push({userId: action.payload.userId})
            return {
                ...state,
                isLiked : isLiked1
            }
        case types.SOCIAL_DISLIKE_SUCCESS: 
            const isLiked2 = 0
            state.socials[state.selectedItem].likes.splice(action.payload.likeIndex, 1)              
            return {
                ...state,
                isLiked : isLiked2
            }
        case types.SOCIAL_SET_USER_ID:             
            return {
                ...state,
                userId: action.payload.userId
            }
        case types.SOCIAL_NEW_COMMENT_SUCCESS: 
            state.socials[state.selectedItem].comments.push({text: action.payload.text, 
                userId: state.userId, 
                userImage: action.payload.userImage, 
                userName: action.payload.userName})
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}

export default socialReducer