import React from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {Redirect, Route, Switch} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';

export const App = () => {
    return (
        <div className="container">
            <HeaderContainer/>
            <div className="app-wrapper">
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                        <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                        <Route path="/users" render={() => <UsersContainer/>}/>
                        <Route path="/news" render={() => <News/>}/>
                        <Route path="/music" render={() => <Music/>}/>
                        <Route path="/settings" render={() => <Settings/>}/>
                        <Redirect to="/profile"/>
                    </Switch>
                </div>
            </div>
        </div>
    )
}