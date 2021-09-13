import {AppStateType} from './redux-store';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {APIResponseType, usersAPI} from '../api/api';

export type UsersType = {
    id: number
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
    name: string
    status: string
    location?: {
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
    type: typeof FOLLOW
    userID: number
}
export type UnfollowActionType = {
    type: typeof UNFOLLOW
    userID: number
}
export type SetUsersActionType = {
    type: typeof SET_USERS
    users: UsersDataType
}
export type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export type ToggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
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

const initialState: UsersPageType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

export const usersReducer = (state: UsersPageType = initialState, action: UsersActionType): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    return u.id === action.userID ? {...u, followed: true} : u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    return u.id === action.userID ? {...u, followed: false} : u
                })
            }
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
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

export const followSuccess = (userID: number): FollowActionType => ({type: FOLLOW, userID})
export const unfollowSuccess = (userID: number): UnfollowActionType => ({type: UNFOLLOW, userID})
export const setUsers = (users: UsersDataType): SetUsersActionType => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
})
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

export type ThunkType = ThunkAction<void, AppStateType, unknown, UsersActionType>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch: Dispatch<UsersActionType>) => {

        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

const followUnfollowFlow = async (dispatch: Dispatch<UsersActionType>, userId: number, apiMethod: (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => UsersActionType) => {
    dispatch(toggleIsFollowingProgress(true, userId))

    let response = await apiMethod(userId)

    if (response && response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch: Dispatch<UsersActionType>) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)

        await followUnfollowFlow(dispatch, userId, apiMethod, followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: Dispatch<UsersActionType>) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        await followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess)
    }
}