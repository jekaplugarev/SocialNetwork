import {v1} from 'uuid';
import {ActionsType} from './redux-store';

export type DialogsType = {
    id: string
    name: string
    img: string
}
export type MessagesType = {
    id: string
    message: string
}
export type DialogsDataType = Array<DialogsType>
export type MessagesDataType = Array<MessagesType>
export type DialogsPageType = {
    dialogsData: DialogsDataType
    messagesData: MessagesDataType
    newMessageText: string
}
export type AddMessageActionType = {
    type: typeof ADD_MESSAGE
}
export type UpdateNewMessageActionType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY
    newText: string
}

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
        case ADD_MESSAGE: {
            let newMessage: MessagesType = {
                id: v1(),
                message: state.newMessageText
            }
            let stateCopy = {
                ...state,
                messagesData: [...state.messagesData, newMessage],
                newMessageText: ''
            }
            if (stateCopy.newMessageText.trim() === '') {
                return
            }
            return stateCopy
        }
        case UPDATE_NEW_MESSAGE_BODY: {
            return {
                ...state,
                newMessageText: action.newText
            }
        }
        default:
            return state
    }
}

export const addMessageCreator = (): AddMessageActionType => ({type: ADD_MESSAGE})

export const updateNewMessageTextCreator = (text: string): UpdateNewMessageActionType =>
    ({type: UPDATE_NEW_MESSAGE_BODY, newText: text})
