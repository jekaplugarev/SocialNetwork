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
import {UserOutlined, LaptopOutlined, NotificationOutlined, MailOutlined} from '@ant-design/icons';
import {AppHeader} from "./components/AppHeader/AppHeader";

const {Content, Footer, Sider} = Layout

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

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
                    {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                    {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
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
                                {/*<Menu.Item key="2" icon={<MailOutlined/>}>*/}
                                {/*    <Link to="/dialogs">Messages</Link>*/}
                                {/*</Menu.Item>*/}
                                <Menu.Item key="3" icon={<LaptopOutlined/>}>
                                    <Link to="/users">Users</Link>
                                </Menu.Item>
                                <Menu.Item key="4" icon={<NotificationOutlined/>}>
                                    <Link to="/chat">Chat</Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                                {/*<Route path="/dialogs" render={withSuspense(DialogsContainer)}/>*/}
                                <Route path="/users" render={() => <UsersPage/>}/>
                                <Route path="/news" render={() => <News/>}/>
                                <Route path="/settings" render={() => <Settings/>}/>
                                <Route path="/login" render={() => <LoginPage/>}/>
                                <Route path="/chat" render={withSuspense(ChatPage)}/>
                                <Redirect to="/profile"/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Jeka Pl Social Network</Footer>
            </Layout>

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