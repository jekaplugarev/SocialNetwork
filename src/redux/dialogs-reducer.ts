import {ActionsType, DialogsPageType, MessagesType} from './store';
import {v1} from 'uuid';

let initialState: DialogsPageType = {
    dialogsData: [
        {
            id: v1(),
            name: 'Jeka',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU'
        },
        {
            id: v1(),
            name: 'Kate',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU'
        },
        {
            id: v1(),
            name: 'Dima',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU'
        },

    ],
    messagesData: [
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'How are you?'},
        {id: v1(), message: 'I am good'},
    ],
    newMessageText: ''
}

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType): DialogsPageType | void => {
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
            return state
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