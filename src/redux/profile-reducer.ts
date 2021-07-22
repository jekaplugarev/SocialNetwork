import {v1} from 'uuid';
import {Dispatch} from 'redux';
import {profileAPI, usersAPI} from '../api/api';

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
    status: string
    updateStatus: (status: string) => void
}
export type ProfilePageType = {
    postsData: PostsDataType
    newPostText: string
    profile: ProfileType | null
    status: string
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
    profile: ProfileType | null
}
export type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

type ActionsType =
    AddPostActionType
    | UpdateNewPostActionType
    | SetUserProfileActionType
    | SetStatusActionType

let initialState: ProfilePageType = {
    postsData: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'It\'s my first post', likesCount: 20}
    ],
    newPostText: '',
    profile: null,
    status: ''
}

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'

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
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default: {
            return state
        }
    }
}

export const addPost = (): AddPostActionType => ({type: ADD_POST})

export const updateNewPostText = (text: string): UpdateNewPostActionType =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text})

export const setUserProfile = (profile: ProfileType | null): SetUserProfileActionType =>
    ({type: SET_USER_PROFILE, profile})

export const setStatus = (status: string): SetStatusActionType =>
    ({type: SET_STATUS, status})

export const getUserProfile = (userId: string) => (dispatch: Dispatch<ActionsType>) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
}

export const getStatus = (userId: string) => (dispatch: Dispatch<ActionsType>) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        })
}

export const updateStatus = (status: string) => (dispatch: Dispatch<ActionsType>) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}
