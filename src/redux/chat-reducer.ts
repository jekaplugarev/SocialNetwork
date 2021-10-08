import {AppThunkType} from './redux-store';
import {chatAPI} from "../api/chat-api";
import {Dispatch} from "redux";

let initialState: ChatType = {
    messages: [] as ChatMessageType[]
}

const MESSAGES_RECEIVED = 'chat/MESSAGES_RECEIVED'

export const chatReducer = (state = initialState, action: ChatActionType): ChatType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}

export const messagesReceived = (messages: ChatMessageType[]) => ({
    type: MESSAGES_RECEIVED,
    payload: {messages}
} as const)

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): AppThunkType => async dispatch => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): AppThunkType => async dispatch => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string) => {
    chatAPI.sendMessage(message)
}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type SetMessagesType = {
    type: typeof MESSAGES_RECEIVED
    payload: {
        messages: ChatMessageType[]
    }
}
type ChatActionType = SetMessagesType
type ChatType = {
    messages: ChatMessageType[]
}