import React from 'react'
import style from './../Dialogs.module.css'
import {MessagesType} from '../../../redux/dialogs-reducer';

export const Message: React.FC<MessagesType> = (props) => {
    return (
        <div className={style.message}>{props.message}</div>
    )
}