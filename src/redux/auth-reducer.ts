export type AuthType = {
    userId: number | null
    email: string | null
    login: string | null
    resultCode: number | null
    isAuth: boolean
}
export type SetUserDataActionType = {
    type: 'SET_USER_DATA'
    userId: number | null
    email: string | null
    login: string | null
}
type AuthActionType = SetUserDataActionType

let initialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    resultCode: null,
    isAuth: false
}

export const authReducer = (state: AuthType = initialState, action: AuthActionType): AuthType | void => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null): SetUserDataActionType => ({
    type: 'SET_USER_DATA',
    userId,
    email,
    login
})