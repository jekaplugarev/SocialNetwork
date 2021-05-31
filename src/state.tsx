import {v1} from 'uuid'

let onChange = () => {
    console.log('Render')
}

let state: RootStateType = {
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

export const addPost = () => {
    let newPost: PostsType = {
        id: v1(),
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    if (state.profilePage.newPostText.trim() === '') {
        return
    }
    state.profilePage.postsData.push(newPost)
    state.profilePage.newPostText = ''
    onChange()
}

export const addMessage = () => {
    let newMessage: MessagesType = {
        id: v1(),
        message: state.dialogsPage.newMessageText
    }
    if (state.dialogsPage.newMessageText.trim() === '') {
        return
    }
    state.dialogsPage.messagesData.push(newMessage)
    state.dialogsPage.newMessageText = ''
    onChange()
}

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    onChange()
}

export const updateNewMessageText = (newText: string) => {
    state.dialogsPage.newMessageText = newText
    onChange()
}

export const subscribe = (observer: () => void) => {
    onChange = observer
}

export default state