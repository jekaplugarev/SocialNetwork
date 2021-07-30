import {AppStateType} from './redux-store';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {usersAPI} from '../api/api';

export type UsersType = {
    id: number
    photos: {
        small: string
        large: string
    }
    followed: boolean
    name: string
    status: string
    location: {
        city: string
        country: string
    }
}
export type UsersDataType = Array<UsersType>
export type UsersPageType = {
    users: UsersDataType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
export type FollowActionType = {
    type: 'FOLLOW'
    userID: number
}
export type UnfollowActionType = {
    type: 'UNFOLLOW'
    userID: number
}
export type SetUsersActionType = {
    type: 'SET_USERS'
    users: UsersDataType
}
export type SetCurrentPageActionType = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}
export type SetTotalUsersCountActionType = {
    type: 'SET_TOTAL_USERS_COUNT'
    totalCount: number
}
export type ToggleIsFetchingActionType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}
export type ToggleIsFollowingProgressActionType = {
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS'
    isFetching: boolean
    userId: number
}
export type UsersActionType = FollowActionType
    | UnfollowActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType
    | ToggleIsFollowingProgressActionType

let initialState: UsersPageType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export const usersReducer = (state: UsersPageType = initialState, action: UsersActionType): UsersPageType | void => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state, users: state.users.map(u => {
                    return u.id === action.userID ? {...u, followed: true} : u
                })
            }
        case 'UNFOLLOW':
            return {
                ...state, users: state.users.map(u => {
                    return u.id === action.userID ? {...u, followed: false} : u
                })
            }
        case 'SET_USERS':
            return {
                ...state, users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalCount}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

export const followSuccess = (userID: number): FollowActionType => ({type: 'FOLLOW', userID})
export const unfollowSuccess = (userID: number): UnfollowActionType => ({type: 'UNFOLLOW', userID})
export const setUsers = (users: UsersDataType): SetUsersActionType => ({type: 'SET_USERS', users})
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: 'SET_CURRENT_PAGE',
    currentPage
})
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalCount
})
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching
})
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressActionType => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId
})

export type ThunkType = ThunkAction<void, AppStateType, unknown, UsersActionType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return (dispatch: Dispatch<UsersActionType>) => {

        dispatch(toggleIsFetching(true))

        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
            })
    }
}

export const follow = (userId: number): ThunkType => {
    return (dispatch: Dispatch<UsersActionType>) => {

        dispatch(toggleIsFollowingProgress(true, userId))
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleIsFollowingProgress(false, userId))
            })
    }
}

export const unfollow = (userId: number): ThunkType => {
    return (dispatch: Dispatch<UsersActionType>) => {

        dispatch(toggleIsFollowingProgress(true, userId))
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleIsFollowingProgress(false, userId))
            })
    }
}