import './index.css';
import reportWebVitals from './reportWebVitals';
import state, {addMessage, addPost, subscribe, updateNewMessageText, updateNewPostText} from './state';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import App from './App';
import React from 'react';

const renderTree = () => {
    ReactDOM.render(
        <HashRouter>
            <App
                state={state}
                addPost={addPost}
                addMessage={addMessage}
                updateNewPostText={updateNewPostText}
                updateNewMessageText={updateNewMessageText}
            />
        </HashRouter>,
        document.getElementById('root')
    );
}

renderTree()

subscribe(renderTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
