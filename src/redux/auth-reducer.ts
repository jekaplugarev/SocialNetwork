import {authAPI, securityAPI} from '../api/api';
import {AppThunkType} from './redux-store';
import {stopSubmit} from 'redux-form';

export type AuthDataType = {
    id: number | null
    email: string | null
    login: string | null
}
export type AuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
export type SetUserDataActionType = ReturnType<typeof setAuthUserData>
export type GetCaptchaUrlSuccessActionType = ReturnType<typeof getCaptchaUrlSuccess>

export type AuthActionType = SetUserDataActionType | GetCaptchaUrlSuccessActionType

let initialState: AuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_ULR_SUCCESS = 'auth/GET_CAPTCHA_ULR_SUCCESS'

export const authReducer = (state: AuthType = initialState, action: AuthActionType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_ULR_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {
        id,
        email,
        login,
        isAuth
    }
} as const)

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_ULR_SUCCESS,
    payload: {captchaUrl}
} as const)

export const getAuthUserData = (): AppThunkType => async dispatch => {
    const response = await authAPI.me()

    if (response.data.resultCode === 0) {
        const {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): AppThunkType => async dispatch => {
    const response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = (): AppThunkType => async dispatch => {
    const response = await securityAPI.getCaptcha()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): AppThunkType => async dispatch => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

