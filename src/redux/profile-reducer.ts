import {v1} from 'uuid';
import {ActionsType, PostsType, ProfilePageType} from './state';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export const profileReducer = (state: ProfilePageType, action: ActionsType) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            }
            if (state.newPostText.trim() === '') {
                return
            }
            state.postsData.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}

export const addPostCreator = (): AddPostActionType => ({type: ADD_POST})

export const updateNewPostTextCreator = (text: string): UpdateNewPostActionType =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text})

export type AddPostActionType = {
    type: typeof ADD_POST
}

export type UpdateNewPostActionType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}

