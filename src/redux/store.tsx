import {AddPostActionType, profileReducer, UpdateNewPostActionType} from './profile-reducer';
import {AddMessageActionType, dialogsReducer, UpdateNewMessageActionType} from './dialogs-reducer';
import { v1 } from 'uuid';

// export let store: StoreType = {
//     _state: {
//         dialogsPage: {
//             dialogsData: [
//                 {
//                     id: v1(),
//                     name: 'Jeka',
//                     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU'
//                 },
//                 {
//                     id: v1(),
//                     name: 'Kate',
//                     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU'
//                 },
//                 {
//                     id: v1(),
//                     name: 'Dima',
//                     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU'
//                 },
//
//             ],
//             messagesData: [
//                 {id: v1(), message: 'Hi'},
//                 {id: v1(), message: 'How are you?'},
//                 {id: v1(), message: 'I am good'},
//             ],
//             newMessageText: ''
//         },
//         profilePage: {
//             postsData: [
//                 {id: v1(), message: 'Hi, how are you?', likesCount: 12},
//                 {id: v1(), message: 'It\'s my first post', likesCount: 20}
//             ],
//             newPostText: ''
//         }
//     },
//     _onChange() {
//         console.log('Render')
//     },
//
//     getState() {
//         return this._state
//     },
//     subscribe(callback) {
//         this._onChange = callback
//     },
//
//     dispatch(action: ActionsType) {
//         profileReducer(this._state.profilePage, action)
//         dialogsReducer(this._state.dialogsPage, action)
//         this._onChange()
//     }
// }

// export type StoreType = {
//     _state: RootStateType
//     _onChange: () => void
//     subscribe: (callback: () => void) => void
//     getState: () => RootStateType
//     dispatch: (action: ActionsType) => void
// }

// export type RootStateType = {
//     dialogsPage: DialogsPageType
//     profilePage: ProfilePageType
// }