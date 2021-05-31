import React from 'react';
import {PostsType, updateNewPostText} from '../../state';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import style from './Profile.module.css'

export type ProfileType = {
    postsData: Array<PostsType>
    addPost: () => void
    newPostText: string
    updateNewPostText: (newText: string) => void
}

const Profile: React.FC<ProfileType> = (props) => {
    return (
        <div className={style.profile}>
            <ProfileInfo/>
            <MyPosts
                postsData={props.postsData}
                addPost={props.addPost}
                newPostText={props.newPostText}
                updateNewPostText={props.updateNewPostText}
            />
        </div>
    )

}

export default Profile;