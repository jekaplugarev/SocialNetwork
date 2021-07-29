import {v1} from 'uuid';

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
}
export type AddMessageActionType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}

type ActionsType =
    AddMessageActionType

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
}

const ADD_MESSAGE = 'ADD-MESSAGE'

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType): DialogsPageType | void => {


    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage: MessagesType = {
                id: v1(),
                message: action.newMessageBody
            }
            let stateCopy = {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            }
            if (action.newMessageBody.trim() === '') {
                return
            }
            return stateCopy
        }
        default:
            return state
    }
}

export const addMessageCreator = (newMessageBody: string): AddMessageActionType => ({type: ADD_MESSAGE, newMessageBody})
