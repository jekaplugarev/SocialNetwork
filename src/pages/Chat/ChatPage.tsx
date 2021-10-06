import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./ChatPage.module.css";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}


const Chat: React.FC = () => {
    const [wsChanel, setWsChanel] = useState<WebSocket | null>(null)
    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => createChanel()

        function createChanel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeHandler)
            setWsChanel(ws)
        }

        createChanel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChanel={wsChanel}/>
            <AddMessageForm wsChanel={wsChanel}/>
        </div>
    )
}

const Messages: React.FC<{ wsChanel: WebSocket | null }> = ({wsChanel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        wsChanel?.addEventListener('message', messageHandler)

        return () => {
            wsChanel?.removeEventListener('message', messageHandler)
        }
    }, [wsChanel])

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

const AddMessageForm: React.FC<{ wsChanel: WebSocket | null }> = ({wsChanel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => setReadyStatus('ready')
        wsChanel?.addEventListener('open', openHandler)

        return () => {
            wsChanel?.removeEventListener('open', openHandler)
        }
    }, [wsChanel])

    const sendMessage = () => {
        if (!message) return
        wsChanel?.send(message)
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
                    onClick={sendMessage}
                    disabled={wsChanel === null || readyStatus !== 'ready'}
                    className={style.messageBtn}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatPage