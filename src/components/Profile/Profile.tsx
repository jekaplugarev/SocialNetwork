import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import style from './Profile.module.css'
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

export const Profile = () => {
    return (
        <div className={style.profile}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}