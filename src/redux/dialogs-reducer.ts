import {ActionsType, DialogsPageType, MessagesType} from './state';
import {v1} from 'uuid';

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'

export const dialogsReducer = (state: DialogsPageType, action: ActionsType): DialogsPageType | void => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage: MessagesType = {
                id: v1(),
                message: state.newMessageText
            }
            if (state.newMessageText.trim() === '') {
                return
            }
            state.messagesData.push(newMessage)
            state.newMessageText = ''
            break;
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageText = action.newText
            return state
        default:
            return state
    }
}

export const addMessageCreator = (): AddMessageActionType => ({type: ADD_MESSAGE}) as const

export const updateNewMessageTextCreator = (text: string): UpdateNewMessageActionType =>
    ({type: UPDATE_NEW_MESSAGE_BODY, newText: text}) as const

export type AddMessageActionType = {
    type: typeof ADD_MESSAGE
}

export type UpdateNewMessageActionType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY
    newText: string
}