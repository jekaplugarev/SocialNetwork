import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Redirect, Route, Switch} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {RootStateType, StoreType} from './redux/store';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';

export type AppType = {
    store: StoreType
    state: RootStateType
    dispatch: any
}

export const App: React.FC<AppType> = (props) => {
    return (
        <div className="container">
            <Header/>
            <div className="app-wrapper">
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route path="/profile" render={() => <Profile
                            store={props.store}
                        />}/>
                        <Route path="/dialogs" render={() => <DialogsContainer
                            store={props.store}
                        />}/>
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