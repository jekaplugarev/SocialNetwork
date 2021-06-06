import React from 'react'
import {NavLink} from 'react-router-dom'
import style from './../Dialogs.module.css'
import {DialogsType} from '../../../redux/state';

const DialogItem: React.FC<DialogsType> = (props) => {
    return (
        <div className={style.dialog}>
            <NavLink to={'/dialogs/' + props.id} activeClassName={style.active}>
                <div className={style.user}>
                    <img src={props.img} alt={'avatar'}/>
                    <div>{props.name}</div>
                </div>
            </NavLink>
        </div>
    )
}

export default DialogItem