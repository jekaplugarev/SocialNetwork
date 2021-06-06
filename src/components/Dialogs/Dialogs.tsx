import React, {LegacyRef} from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {
    DialogsType,
    MessagesType, StoreType,
} from '../../redux/state';
import {addMessageCreator, updateNewMessageTextCreator} from '../../redux/dialogs-reducer';

export type DialogsPageType = {
    store: StoreType
    newMessageText: string
}

const Dialogs: React.FC<DialogsPageType> = (props) => {
    let state = props.store.getState().dialogsPage

    let dialogsElements = state.dialogsData.map((d: DialogsType) => <div key={d.id}><DialogItem name={d.name} id={d.id} img={d.img}/></div>)

    let messagesElements = state.messagesData.map((m: MessagesType) => <div key={m.id}><Message message={m.message} id={m.id}/></div>)

    const newMessageElement: LegacyRef<HTMLTextAreaElement> = React.createRef()

    const addMessage = () => {
        props.store.dispatch(addMessageCreator())
    }

    const onMessageChange = () => {
        if (newMessageElement.current !== null) {
            const textMessage = newMessageElement.current.value
            props.store.dispatch(updateNewMessageTextCreator(textMessage))
        }
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                <div>
                    {messagesElements}
                </div>
                <div className={style.enterMessage}>
                        <textarea
                            ref={newMessageElement}
                            rows={1}
                            className={style.messageField}
                            value={props.newMessageText}
                            onChange={onMessageChange}
                            placeholder={'Enter your message...'}
                        />
                    <button
                        onClick={addMessage}
                        className={style.messageBtn}
                    >Send Message
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;