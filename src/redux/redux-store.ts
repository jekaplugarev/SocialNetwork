import {AddPostActionType, profileReducer, UpdateNewPostActionType} from './profile-reducer';
import {AddMessageActionType, dialogsReducer, UpdateNewMessageActionType} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import { combineReducers, createStore } from 'redux';
import {usersReducer} from './users-reducer';

export type AppStateType = ReturnType<typeof rootReducer>
export type ActionsType =
    AddPostActionType
    | UpdateNewPostActionType
    | AddMessageActionType
    | UpdateNewMessageActionType

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer
})

export let store = createStore(rootReducer)