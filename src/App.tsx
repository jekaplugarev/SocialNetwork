import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Redirect, Route, Switch} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {StoreType} from './redux/store';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';

// export type AppType = {
//     store: StoreType
// }

export const App = () => {
    return (
        <div className="container">
            <Header/>
            <div className="app-wrapper">
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route path="/profile" render={() => <Profile/>}/>
                        <Route path="/dialogs" render={() => <DialogsContainer/>}/>
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