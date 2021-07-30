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
    profile: ProfileType | null
    status: string
}
export type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType | null
}
export type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

export type ProfileActionsType =
    AddPostActionType
    | SetUserProfileActionType
    | SetStatusActionType

let initialState: ProfilePageType = {
    postsData: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'It\'s my first post', likesCount: 20}
    ],
    profile: null,
    status: ''
}

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'

export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionsType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostsType = {
                id: v1(),
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
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

export const addPost = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText})

export const setUserProfile = (profile: ProfileType | null): SetUserProfileActionType =>
    ({type: SET_USER_PROFILE, profile})

export const setStatus = (status: string): SetStatusActionType =>
    ({type: SET_STATUS, status})

export const getUserProfile = (userId: number) => (dispatch: Dispatch<ProfileActionsType>) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
}

export const getStatus = (userId: number) => (dispatch: Dispatch<ProfileActionsType>) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        })
}

export const updateStatus = (status: string) => (dispatch: Dispatch<ProfileActionsType>) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}
