import React from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../../redux/auth-reducer';
import {Button, Col, Layout, Menu, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUsersLogin, selectIsAuth} from "../../redux/auth-selectors";

const {Header} = Layout

export const AppHeader: React.FC = () => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUsersLogin)

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout)
    }

    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={20}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link to="/profile">Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/dialogs">Messages</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/users">Users</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                {isAuth
                    ? <>
                        <Col span={2}>
                            <span style={{color: 'white'}}>{login}</span>
                        </Col>
                        <Col span={2}>
                            <Button onClick={logoutHandler}>Logout</Button>
                        </Col>
                    </>
                    : <Col span={6}><Link to="/login">Login</Link></Col>
                }
            </Row>
        </Header>

        // <header className={style.header}>
        //     <NavLink to="/profile" className={style.nav}>
        //         <img src="https://ya-webdesign.com/transparent600_/mountain-clipart-png-8.png" alt="Logo"/>
        //         <span className={style.title}>My Social Network</span>
        //     </NavLink>
        //     <div className={style.loginBlock}>
        //         {props.auth.isAuth
        //             ? <div className={style.login}>
        //                 {props.auth.login}
        //                 <button
        //                     onClick={props.logout}
        //                     className={style.logoutBtn}
        //
        //                 >Log out</button>
        //         </div>
        //             : <NavLink to="/login">Login</NavLink>}
        //     </div>
        // </header>
    )
}