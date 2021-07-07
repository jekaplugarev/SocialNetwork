export type AuthType = {
    id: number | null
    email: string | null
    login: string | null
}
export type AuthPropertiesType = {
    data: AuthType
    resultCode: number | null
    messages: string[]
    isAuth: boolean
}
export type SetUserDataActionType = {
    type: 'SET_USER_DATA'
    id: number | null
    email: string | null
    login: string | null
}
type AuthActionType = SetUserDataActionType

let initialState: AuthPropertiesType = {
    data: {
        id: null,
        email: null,
        login: null,
    },
    resultCode: null,
    messages: [],
    isAuth: false
}

export const authReducer = (state: AuthPropertiesType = initialState, action: AuthActionType): AuthPropertiesType | void => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                data: {
                    id: action.id,
                    email: action.email,
                    login: action.login
                },
                isAuth: true
            }
        default:
            return state
    }
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null): SetUserDataActionType => ({
    type: 'SET_USER_DATA', id, email, login
})