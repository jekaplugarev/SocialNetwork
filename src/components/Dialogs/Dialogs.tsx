import React, {LegacyRef} from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {DialogsContainerPropsType} from './DialogsContainer';
import {DialogsType, MessagesType} from '../../redux/dialogs-reducer';

export const Dialogs: React.FC<DialogsContainerPropsType> = (props) => {
    let dialogsElements = props.dialogsPage.dialogsData.map((d: DialogsType) => <div key={d.id}><DialogItem name={d.name} id={d.id}
                                                                                            img={d.img}/></div>)

    let messagesElements = props.dialogsPage.messagesData.map((m: MessagesType) => <div key={m.id}><Message message={m.message}
                                                                                            id={m.id}/></div>)

    const newMessageElement: LegacyRef<HTMLTextAreaElement> = React.createRef()

    const addMessage = () => {
        props.sendMessage()
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
                            value={props.dialogsPage.newMessageText}
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