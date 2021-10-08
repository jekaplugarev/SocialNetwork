import {AppThunkType} from './redux-store';
import {chatAPI, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";

let initialState: ChatType = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const MESSAGES_RECEIVED = 'chat/MESSAGES_RECEIVED'
const STATUS_CHANGED = 'chat/STATUS_CHANGED'

export const chatReducer = (state = initialState, action: ChatActionType): ChatType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        case STATUS_CHANGED:
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

export const messagesReceived = (messages: ChatMessageType[]) => ({
    type: MESSAGES_RECEIVED,
    payload: {messages}
} as const)
export const statusChanged = (status: StatusType) => ({
    type: STATUS_CHANGED,
    payload: {status}
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

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): AppThunkType => async dispatch => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): AppThunkType => async dispatch => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): AppThunkType => async dispatch => {
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
type StatusChangeType = {
    type: typeof STATUS_CHANGED
    payload: {
        status: StatusType
    }
}
type ChatActionType = SetMessagesType | StatusChangeType
type ChatType = {
    messages: ChatMessageType[]
    status: StatusType
}