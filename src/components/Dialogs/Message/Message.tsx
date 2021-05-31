import React from 'react'
import { MessagesType } from '../../../state';
import style from './../Dialogs.module.css'

const Message: React.FC<MessagesType> = (props) => {
    return (
        <div className={style.message}>{props.message}</div>
    )
}

export default Message;