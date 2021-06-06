import {ActionsType, DialogsPageType, MessagesType} from './state';
import {v1} from 'uuid';

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'

export const dialogsReducer = (state: DialogsPageType, action: ActionsType) => {
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

export const addMessageCreator = () => ({type: ADD_MESSAGE}) as const

export const updateNewMessageTextCreator = (text: string) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, newText: text}) as const

export type AddMessageActionType = ReturnType<typeof addMessageCreator>

export type UpdateNewMessageActionType = ReturnType<typeof updateNewMessageTextCreator>