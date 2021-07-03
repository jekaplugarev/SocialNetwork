import {v1} from 'uuid';

export type PostsType = {
    id: string
    message: string
    likesCount: number
}
export type PostsDataType = Array<PostsType>
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}
export type ProfileAPIType = {
    profile: ProfileType | null
}
export type ProfilePageType = {
    postsData: PostsDataType
    newPostText: string
    profile: ProfileType | null
}
export type AddPostActionType = {
    type: typeof ADD_POST
}
export type UpdateNewPostActionType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: any
}

type ActionsType =
    AddPostActionType
    | UpdateNewPostActionType
    | SetUserProfileActionType

let initialState: ProfilePageType = {
    postsData: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'It\'s my first post', likesCount: 20}
    ],
    newPostText: '',
    profile: null
}

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsType): ProfilePageType | void => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostsType = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            }
            let stateCopy = {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            }
            if (state.newPostText.trim() === '') {
                return
            }
            return stateCopy
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default: {
            return state
        }
    }
}

export const addPost = (): AddPostActionType => ({type: ADD_POST})

export const updateNewPostText = (text: string): UpdateNewPostActionType =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text})

export const setUserProfile = (profile: any): SetUserProfileActionType =>
    ({type: SET_USER_PROFILE, profile})
