import React from "react";
import { NavLink } from "react-router-dom";
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <NavLink to='/profile' className={s.nav}>
                <img src="https://ya-webdesign.com/transparent600_/mountain-clipart-png-8.png" alt="Logo"/>
                <span className={s.title}>My Social Network</span>
            </NavLink>
        </header>
    )
}

export default Header;