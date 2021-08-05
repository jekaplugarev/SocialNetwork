import {AppThunkType} from './redux-store';
import {getAuthUserData} from './auth-reducer';

export type AppAuthType = {
    initialized: boolean
}

export type InitializedSuccessActionType = ReturnType<typeof initializedSuccess>;

export type AppAuthActionType = InitializedSuccessActionType

let initialState: AppAuthType = {
    initialized: false
}

export const appReducer = (state: AppAuthType = initialState, action: AppAuthActionType): AppAuthType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = () => ({
    type: 'INITIALIZED_SUCCESS',
} as const)

export const initializeApp = (): AppThunkType => async dispatch => {
    await dispatch(getAuthUserData())
    dispatch(initializedSuccess())
}
