import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./ChatPage.module.css";
import {ChatMessageType, sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}


const Chat: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div style={{height: '600px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message message={m} key={index}/>)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div className={style.message}>
            <img src={message.photo} style={{width: '40px'}} alt='Avatar'/>
            <b className={style.userName}>{message.userName}</b>
            <hr/>
            {message.message}
        </div>
    )
}

const AddMessageForm: React.FC = () => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')

    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }
    const messageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)

    return (
        <div>
            <div>
                <textarea
                    onChange={messageHandler}
                    value={message}
                    className={style.messageField}
                />
            </div>
            <div>
                <button
                    onClick={sendMessageHandler}
                    disabled={false}
                    className={style.messageBtn}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatPage