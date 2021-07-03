import preloader from '../../../img/Iphone-spinner-2.gif'
import style from '../../Users/Users.module.css';
import React from 'react';

export const Preloader = () => {
    return <div className={style.img}>
        <img
            src={preloader}
            alt={'preloader'}
        />
    </div>
}