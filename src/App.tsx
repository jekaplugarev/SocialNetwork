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
import state, {RootStateType} from './state';

export type AppType = {
    state: RootStateType
    addPost: () => void
    addMessage: () => void
    updateNewPostText: (newText: string) => void
    updateNewMessageText: (newText: string) => void
}

const App: React.FC<AppType> = (props) => {
    return (
        <div className="container">
            <Header/>
            <div className="app-wrapper">
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route path="/" exact render={() => <Redirect to="/profile"/>}/>
                        <Route path="/dialogs" render={() => <Dialogs
                            dialogsData={state.dialogsPage.dialogsData}
                            messagesData={state.dialogsPage.messagesData}
                            addMessage={props.addMessage}
                            updateNewMessageText={props.updateNewMessageText}
                            newMessageText={props.state.dialogsPage.newMessageText}
                        />}/>
                        <Route path="/profile" render={() => <Profile
                            postsData={state.profilePage.postsData}
                            addPost={props.addPost}
                            newPostText={props.state.profilePage.newPostText}
                            updateNewPostText={props.updateNewPostText}
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