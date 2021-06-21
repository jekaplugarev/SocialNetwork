export type UsersType = {
    id: string
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: {
        city: string
        country: string
    }
}
export type UsersDataType = Array<UsersType>
export type UsersPageType = {
    users: UsersDataType
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
type UsersActionType = FollowActionType | UnfollowActionType | SetUsersActionType

let initialState: UsersPageType = {
    users: []
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
                ...state, users: [...state.users, ...action.users]
            }
        default:
            return state
        // case ADD_POST: {
        //     let newPost: PostsType = {
        //         id: v1(),
        //         message: state.newPostText,
        //         likesCount: 0
        //     }
        //     let stateCopy = {
        //         ...state,
        //         postsData: [...state.postsData, newPost],
        //         newPostText: ''
        //     }
        //     if (state.newPostText.trim() === '') {
        //         return
        //     }
        //     return stateCopy
        // }
        // case UPDATE_NEW_POST_TEXT: {
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //     }
        // }
        // default: {
        //     return state
        // }
    }
}

export const followAC = (userID: string): FollowActionType => ({type: 'FOLLOW', userID})

export const unfollowAC = (userID: string): UnfollowActionType => ({type: 'UNFOLLOW', userID})

export const setUsersAC = (users: UsersDataType): SetUsersActionType => ({type: 'SET_USERS', users})
