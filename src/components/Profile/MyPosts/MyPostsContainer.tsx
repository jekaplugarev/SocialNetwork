import React from 'react';
import {addPostCreator, updateNewPostTextCreator} from '../../../redux/profile-reducer';
import {StoreType} from '../../../redux/store';
import {MyPosts} from './MyPosts';

export type MyPostsContainerType = {
    store: StoreType
}

export const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {
    let state = props.store.getState()

    const addPost = () => {
        props.store.dispatch(addPostCreator())
    }

    const updateNewPostText = (textPost: string) => {
        props.store.dispatch(updateNewPostTextCreator(textPost))
    }

    return (
        <MyPosts
            updateNewPostText={updateNewPostText}
            addPost={addPost}
            newPostText={state.profilePage.newPostText}
            posts={state.profilePage.postsData}
        />
    )
}