import {v1} from 'uuid';

import {profileAPI, usersAPI} from '../api/api';

import {AppStateType, AppThunkType} from './redux-store';
import {stopSubmit} from 'redux-form';

export type ProfileUpdateType = {
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | ''
    fullName: string | ''
    userId: number
    aboutMe: string | ''
}

export type ContactsType = {
    facebook: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}

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
export type ProfilePageType = {
    postsData: PostsDataType
    profile: ProfileType | null
    status: string
}
export type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: string
}
export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType | null
}
export type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

export type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO
    photos: {
        small: string
        large: string
    }
}

export type ProfileActionsType =
    AddPostActionType
    | DeletePostActionType
    | SetUserProfileActionType
    | SetStatusActionType
    | SavePhotoSuccessActionType

let initialState: ProfilePageType = {
    postsData: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'It\'s my first post', likesCount: 20}
    ],
    profile: null,
    status: ''
}

const ADD_POST = 'profile/ADD-POST'
const DELETE_POST = 'profile/DELETE-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_STATUS = 'profile/SET-STATUS'
const SAVE_PHOTO = 'profile/SAVE-PHOTO'

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
        case DELETE_POST:
            return {...state, postsData: state.postsData.filter(p => p.id !== action.postId)}
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SAVE_PHOTO: {
            return {...state, profile: state.profile && {...state.profile, photos: action.photos}}
        }
        default: {
            return state
        }
    }
}

export const addPost = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText})

export const deletePost = (postId: string): DeletePostActionType => ({type: DELETE_POST, postId})

export const setUserProfile = (profile: ProfileType | null): SetUserProfileActionType =>
    ({type: SET_USER_PROFILE, profile})

export const setStatus = (status: string): SetStatusActionType =>
    ({type: SET_STATUS, status})

export const savePhotoSuccess = (photos: { small: string, large: string }): SavePhotoSuccessActionType =>
    ({type: SAVE_PHOTO, photos})


export const getUserProfile = (userId: number): AppThunkType => async dispatch => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number): AppThunkType => async dispatch => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string): AppThunkType => async dispatch => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: File): AppThunkType => async dispatch => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileUpdateType): AppThunkType => async (dispatch, getState: () => AppStateType) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        if (userId) dispatch(getUserProfile(userId))
    }
}
