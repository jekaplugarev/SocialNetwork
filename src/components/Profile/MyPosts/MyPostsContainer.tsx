import React from 'react';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {addPostCreator, updateNewPostTextCreator} from '../../../redux/profile-reducer';
import {AppStateType} from '../../../redux/redux-store';
import {ProfilePageType} from '../../../redux/store';
import { Dispatch } from 'redux';


// export type MyPostsContainerType = {
//     store: StoreType
// }

// export const MyPostsContainer = () => {
//     return <StoreContext.Consumer>
//         {
//             (store: StoreType) => {
//                 let state = store.getState()
//
//                 const addPost = () => {
//                     store.dispatch(addPostCreator())
//                 }
//
//                 const updateNewPostText = (textPost: string) => {
//                     store.dispatch(updateNewPostTextCreator(textPost))
//                 }
//
//                 return <MyPosts
//                     updateNewPostText={updateNewPostText}
//                     addPost={addPost}
//                     newPostText={state.profilePage.newPostText}
//                     posts={state.profilePage.postsData}
//                 />
//             }
//
//         }
//     </StoreContext.Consumer>
// }

type MapStateToPropsType = {
    profilePage: ProfilePageType
}

type MapDispatchToPropsType = {
    updateNewPostText: (textPost: string) => void
    addPost: () => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage
        // posts: state.profilePage.postsData,
        // newPostText: state.profilePage.newPostText
    }
}

export type MyPostsContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewPostText: (textPost: string) => {
            dispatch(updateNewPostTextCreator(textPost))
        },
        addPost: () => {
            dispatch(addPostCreator())
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)