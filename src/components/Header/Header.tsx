import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Header.module.css';

const Header = (props) => {
    return (
        <header className={style.header}>
            <NavLink to="/profile" className={style.nav}>
                <img src="https://ya-webdesign.com/transparent600_/mountain-clipart-png-8.png" alt="Logo"/>
                <span className={style.title}>My Social Network</span>
            </NavLink>
            <div className={style.loginBlock}>
                {props.isAuth ? props.login : <NavLink to="/login">Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;