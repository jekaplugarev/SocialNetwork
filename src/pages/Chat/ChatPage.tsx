import React, {ChangeEvent, useEffect, useState} from "react";

const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

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
    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChanel.addEventListener('message', (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return (
        <div style={{height: '600px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message message={m} key={index}/>)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: '40px'}} alt='Avatar'/><b>{message.userName}</b>
            <hr/>
            {message.message}
        </div>
    )
}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if (!message) return
        wsChanel.send(message)
        setMessage('')
    }
    const messageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)

    return (
        <div>
            <div>
                <textarea onChange={messageHandler} value={message}/>
            </div>
            <div>
                <button
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatPage