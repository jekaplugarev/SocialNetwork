import {v1} from 'uuid'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export let store = {
    _state: {
        dialogsPage: {
            dialogsData: [
                {id: v1(), name: 'Jeka', img: 'https://usdmining.ru/images/team1.jpg'},
                {id: v1(), name: 'Kate', img: 'https://usdmining.ru/images/team1.jpg'},
                {id: v1(), name: 'Dima', img: 'https://usdmining.ru/images/team1.jpg'},

            ],
            messagesData: [
                {id: v1(), message: 'Hi'},
                {id: v1(), message: 'How are you?'},
                {id: v1(), message: 'I am good'},
            ],
            newMessageText: ''
        },
        profilePage: {
            postsData: [
                {id: v1(), message: 'Hi, how are you?', likesCount: 12},
                {id: v1(), message: 'It\'s my first post', likesCount: 20}
            ],
            newPostText: ''
        }
    },
    _onChange() {
        console.log('Render')
    },

    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._onChange = observer
    },

    dispatch(action: ActionType) {
        if (action.type === ADD_POST) {
            let newPost: PostsType = {
                id: v1(),
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            if (this._state.profilePage.newPostText.trim() === '') {
                return
            }
            this._state.profilePage.postsData.push(newPost)
            this._state.profilePage.newPostText = ''
            this._onChange()
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText
            this._onChange()
        } else if (action.type === ADD_MESSAGE) {
            let newMessage: MessagesType = {
                id: v1(),
                message: this._state.dialogsPage.newMessageText
            }
            if (this._state.dialogsPage.newMessageText.trim() === '') {
                return
            }
            this._state.dialogsPage.messagesData.push(newMessage)
            this._state.dialogsPage.newMessageText = ''
            this._onChange()
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogsPage.newMessageText = action.newText
            this._onChange()
        }
    }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}

export const updateNewPostTextActionCreator = (text: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: text
    }
}

export type ActionType = {
    type: string
    newText?: string
}

export type DialogsType = {
    id: string
    name: string
    img: string
}

export type MessagesType = {
    id: string
    message: string
}

export type PostsType = {
    id: string
    message: string
    likesCount: number
}

export type DialogsDataType = Array<DialogsType>

export type MessagesDataType = Array<MessagesType>

export type PostsDataType = Array<PostsType>

export type DialogsPageType = {
    dialogsData: DialogsDataType
    messagesData: MessagesDataType
    newMessageText: string
}

export type ProfilePageType = {
    postsData: PostsDataType
    newPostText: string
}

export type RootStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}