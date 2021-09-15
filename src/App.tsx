import React from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {UsersPage} from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {LoginPage} from './components/Login/LoginPage';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './redux/app-reducer';
import {AppStateType} from './redux/redux-store';
import {Preloader} from './components/common/Preloader/Preloader';
import {withSuspense} from './hoc/withSuspense';

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
            <div className="container">
                <Redirect to="/profile"/>
                <HeaderContainer/>
                <div className="app-wrapper">
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Switch>
                            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                            <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                            <Route path="/users" render={() => <UsersPage/>}/>
                            <Route path="/news" render={() => <News/>}/>
                            <Route path="/music" render={() => <Music/>}/>
                            <Route path="/settings" render={() => <Settings/>}/>
                            <Route path="/login" render={() => <LoginPage/>}/>
                            <Redirect to="/profile"/>
                        </Switch>
                    </div>
                </div>
            </div>
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