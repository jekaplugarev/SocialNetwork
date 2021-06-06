import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {Redirect, Route, Switch} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {store, StoreType} from './redux/state';

export type AppType = {
    store: StoreType
}

const App: React.FC<AppType> = (props) => {
    const state = store.getState()

    return (
        <div className="container">
            <Header/>
            <div className="app-wrapper">
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route path="/" exact render={() => <Redirect to="/profile"/>}/>
                        <Route path="/dialogs" render={() => <Dialogs
                            store={props.store}
                            newMessageText={state.dialogsPage.newMessageText}
                        />}/>
                        <Route path="/profile" render={() => <Profile
                            store={props.store}
                            newPostText={state.profilePage.newPostText}
                        />}/>
                        <Route path="/news" render={() => <News/>}/>
                        <Route path="/music" render={() => <Music/>}/>
                        <Route path="/settings" render={() => <Settings/>}/>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default App