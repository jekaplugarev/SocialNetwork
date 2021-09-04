import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import style from './Profile.module.css'
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfileAPIType} from '../../redux/profile-reducer';

export const Profile = (props: ProfileAPIType) => {
    return (
        <div className={style.profile}>
            <ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}