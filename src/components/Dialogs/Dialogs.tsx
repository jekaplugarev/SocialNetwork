import React, {LegacyRef} from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {DialogsType, MessagesType} from '../../state';

export type DialogsPageType = {
    dialogsData: Array<DialogsType>
    messagesData: Array<MessagesType>
    addMessage: () => void
    updateNewMessageText: (newText: string) => void
    newMessageText: string
}

const Dialogs: React.FC<DialogsPageType> = (props) => {
    let dialogsElements = props.dialogsData.map((d: DialogsType) => <DialogItem name={d.name} id={d.id} img={d.img}/>)

    let messagesElements = props.messagesData.map((m: MessagesType) => <Message message={m.message} id={m.id}/>)

    const newMessageElement: LegacyRef<HTMLTextAreaElement> = React.createRef()

    const addMessage = () => {
        props.addMessage()
    }

    const onMessageChange = () => {
        if (newMessageElement.current !== null) {
            const textMessage = newMessageElement.current.value
            props.updateNewMessageText(textMessage)
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
                            placeholder={'Enter message...'}
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