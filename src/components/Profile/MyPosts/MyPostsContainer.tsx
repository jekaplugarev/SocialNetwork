import React from 'react';
import {addPostCreator, updateNewPostTextCreator} from '../../../redux/profile-reducer';
import {StoreType} from '../../../redux/store';
import {StoreContext} from '../../../StoreContext';
import {MyPosts} from './MyPosts';

// export type MyPostsContainerType = {
//     store: StoreType
// }

export const MyPostsContainer = () => {
    return <StoreContext.Consumer>
        {
            (store: StoreType) => {
                let state = store.getState()

                const addPost = () => {
                    store.dispatch(addPostCreator())
                }

                const updateNewPostText = (textPost: string) => {
                    store.dispatch(updateNewPostTextCreator(textPost))
                }

                return <MyPosts
                    updateNewPostText={updateNewPostText}
                    addPost={addPost}
                    newPostText={state.profilePage.newPostText}
                    posts={state.profilePage.postsData}
                />
            }

        }
    </StoreContext.Consumer>
}