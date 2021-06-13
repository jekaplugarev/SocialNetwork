import React from 'react'

import {
    StoreType,
} from '../../redux/store';
import {addMessageCreator, updateNewMessageTextCreator} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';

export type DialogsPageType = {
    store: StoreType
}

export const DialogsContainer: React.FC<DialogsPageType> = (props) => {
    let state = props.store.getState().dialogsPage

    const sendMessage = () => {
        props.store.dispatch(addMessageCreator())
    }

    const updateNewMessageText = (textMessage: string) => {
        props.store.dispatch(updateNewMessageTextCreator(textMessage))
    }

    return (
        <Dialogs
            updateNewMessageText={updateNewMessageText}
            sendMessage={sendMessage}
            newMessageText={state.newMessageText}
            dialogsPage={state}
            dialogs={state.dialogsData}
            messages={state.messagesData}
        />
    )
}