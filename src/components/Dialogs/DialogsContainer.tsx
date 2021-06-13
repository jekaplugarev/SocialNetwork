import React from 'react'
import {StoreType} from '../../redux/store';
import {addMessageCreator, updateNewMessageTextCreator} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {StoreContext} from '../../StoreContext';

// export type DialogsPageType = {
//     store: StoreType
// }

export const DialogsContainer = () => {

    return <StoreContext.Consumer>
        {
            (store: StoreType) => {
                let state = store.getState().dialogsPage

                const sendMessage = () => {
                    store.dispatch(addMessageCreator())
                }

                const updateNewMessageText = (textMessage: string) => {
                    store.dispatch(updateNewMessageTextCreator(textMessage))
                }
                return <Dialogs
                    updateNewMessageText={updateNewMessageText}
                    sendMessage={sendMessage}
                    newMessageText={state.newMessageText}
                    dialogsPage={state}
                    dialogs={state.dialogsData}
                    messages={state.messagesData}
                />
            }
        }
    </StoreContext.Consumer>
}