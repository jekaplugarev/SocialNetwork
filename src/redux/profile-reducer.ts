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

export const addPostCreator = () => ({type: ADD_POST}) as const

export const updateNewPostTextCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text}) as const

export type AddPostActionType = ReturnType<typeof addPostCreator>

export type UpdateNewPostActionType = ReturnType<typeof updateNewPostTextCreator>

