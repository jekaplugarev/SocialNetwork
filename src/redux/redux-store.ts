import {ProfileActionsType, profileReducer} from './profile-reducer';
import {DialogsActionsType, dialogsReducer} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {UsersActionType, usersReducer} from './users-reducer';
import {AuthActionType, authReducer} from './auth-reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {FormAction, reducer as formReducer} from 'redux-form'
import {AppAuthActionType, appReducer} from './app-reducer';

export type AppStateType = ReturnType<typeof rootReducer>

type AppActionsType = AuthActionType
    | DialogsActionsType
    | ProfileActionsType
    | UsersActionType
    | FormAction
    | AppAuthActionType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))