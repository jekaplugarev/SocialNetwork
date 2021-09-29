import React from 'react';
import './App.css';
import {Link, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import {UsersPage} from './components/Users/UsersContainer';
import {LoginPage} from './components/Login/LoginPage';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './redux/app-reducer';
import {AppStateType} from './redux/redux-store';
import {Preloader} from './components/common/Preloader/Preloader';
import {withSuspense} from './hoc/withSuspense';
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import {AppHeader} from "./components/AppHeader/AppHeader";

const {Content, Footer, Sider} = Layout

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}

type AppTypeProps = MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component <AppTypeProps> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <Layout>
                <AppHeader/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                // defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <Menu.Item key="1" icon={<UserOutlined/>}>
                                    <Link to="/profile">Profile</Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<NotificationOutlined/>}>
                                    <Link to="/dialogs">Messages</Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<LaptopOutlined/>}>
                                    <Link to="/users">Users</Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                                <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                                <Route path="/users" render={() => <UsersPage/>}/>
                                <Route path="/news" render={() => <News/>}/>
                                <Route path="/settings" render={() => <Settings/>}/>
                                <Route path="/login" render={() => <LoginPage/>}/>
                                <Redirect to="/profile"/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Jeka Pl Social Network</Footer>
            </Layout>
            // <div className={style.item}>
            //     <NavLink to="/profile" activeClassName={style.activeLink}>
            //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            //              className={style.svg} viewBox="0 0 16 16">
            //             <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            //             <path fillRule="evenodd"
            //                   d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            //         </svg>
            //         Profile
            //     </NavLink>
            // </div>
            // <div className={style.item}>
            //     <NavLink to="/dialogs" activeClassName={style.activeLink}>
            //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            //              className={style.svg} viewBox="0 0 16 16">
            //             <path
            //                 d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
            //         </svg>
            //         Messages
            //     </NavLink>
            // </div>
            // <div className={style.item}>
            //     <NavLink to="/users" activeClassName={style.activeLink}>
            //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            //              className={style.svg} viewBox="0 0 16 16">
            //             <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            //             <path fillRule="evenodd"
            //                   d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
            //             <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
            //         </svg>
            //         Users
            //     </NavLink>
            // </div>


            // <div className="container">
            //     <Redirect to="/profile"/>
            //     <HeaderContainer/>
            //     <div className="app-wrapper">
            //         <Navbar/>
            //         <div className="app-wrapper-content">
            //             <Switch>
            //                 <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
            //                 <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
            //                 <Route path="/users" render={() => <UsersPage/>}/>
            //                 <Route path="/news" render={() => <News/>}/>
            //                 <Route path="/music" render={() => <Music/>}/>
            //                 <Route path="/settings" render={() => <Settings/>}/>
            //                 <Route path="/login" render={() => <LoginPage/>}/>
            //                 <Redirect to="/profile"/>
            //             </Switch>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);