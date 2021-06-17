import React from 'react'
import {addMessageCreator, updateNewMessageTextCreator} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {DialogsPageType} from '../../redux/store';
import {Dispatch} from 'redux';

// export type DialogsPageType = {
//     store: StoreType
// }

// export const DialogsContainer = () => {
//
//     return <StoreContext.Consumer>
//         {
//             (store: StoreType) => {
//                 let state = store.getState().dialogsPage
//
//                 const sendMessage = () => {
//                     store.dispatch(addMessageCreator())
//                 }
//
//                 const updateNewMessageText = (textMessage: string) => {
//                     store.dispatch(updateNewMessageTextCreator(textMessage))
//                 }
//                 return <Dialogs
//                     updateNewMessageText={updateNewMessageText}
//                     sendMessage={sendMessage}
//                     newMessageText={state.newMessageText}
//                     dialogsPage={state}
//                     dialogs={state.dialogsData}
//                     messages={state.messagesData}
//                 />
//             }
//         }
//     </StoreContext.Consumer>
// }

type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}

type MapDispatchToPropsType = {
    updateNewMessageText: (textMessage: string) => void
    sendMessage: () => void
}

export type DialogsContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        // dialogs: state.dialogsPage.dialogsData,
        // messages: state.dialogsPage.messagesData,
        // newMessageText: state.dialogsPage.newMessageText
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageText: (textMessage: string) => {
            dispatch(updateNewMessageTextCreator(textMessage))
        },
        sendMessage: () => {
            dispatch(addMessageCreator())
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)