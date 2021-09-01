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

export type ProfileActionsType =
    AddPostActionType
    | DeletePostActionType
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

const ADD_POST = 'profile/ADD-POST'
const DELETE_POST = 'profile/DELETE-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_STATUS = 'profile/SET-STATUS'

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

export const getUserProfile = (userId: number) => async (dispatch: Dispatch<ProfileActionsType>) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number) => async (dispatch: Dispatch<ProfileActionsType>) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch<ProfileActionsType>) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
