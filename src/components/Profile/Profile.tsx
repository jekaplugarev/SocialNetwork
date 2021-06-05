import React from 'react';
import {ActionType, PostsType} from '../../state';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import style from './Profile.module.css'

export type ProfileType = {
    postsData: Array<PostsType>
    addPost: () => void
    newPostText: string
    updateNewPostText: (newText: string) => void
    dispatch: (action: ActionType) => void
}

const Profile: React.FC<ProfileType> = (props) => {
    return (
        <div className={style.profile}>
            <ProfileInfo/>
            <MyPosts
                dispatch={props.dispatch}
                postsData={props.postsData}
                addPost={props.addPost}
                newPostText={props.newPostText}
                updateNewPostText={props.updateNewPostText}
            />
        </div>
    )

}

export default Profile;