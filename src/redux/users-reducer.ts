export type UsersType = {
    id: string
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
}
export type FollowActionType = {
    type: 'FOLLOW'
    userID: string
}
export type UnfollowActionType = {
    type: 'UNFOLLOW'
    userID: string
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
type UsersActionType = FollowActionType | UnfollowActionType | SetUsersActionType | SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType

let initialState: UsersPageType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
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
        default:
            return state
    }
}

export const follow = (userID: string): FollowActionType => ({type: 'FOLLOW', userID})
export const unfollow = (userID: string): UnfollowActionType => ({type: 'UNFOLLOW', userID})
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
