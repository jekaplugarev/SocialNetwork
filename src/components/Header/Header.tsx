import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Header.module.css';
import {AuthType} from '../../redux/auth-reducer';

type HeaderPropsType = {
    auth: AuthType
    logout: () => void
}

const Header = (props: HeaderPropsType) => {
    return (
        <header className={style.header}>
            <NavLink to="/profile" className={style.nav}>
                <img src="https://ya-webdesign.com/transparent600_/mountain-clipart-png-8.png" alt="Logo"/>
                <span className={style.title}>My Social Network</span>
            </NavLink>
            <div className={style.loginBlock}>
                {props.auth.isAuth
                    ? <div className={style.login}>
                        {props.auth.login}
                        <button
                            onClick={props.logout}
                            className={style.logoutBtn}

                        >Log out</button>
                </div>
                    : <NavLink to="/login">Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;