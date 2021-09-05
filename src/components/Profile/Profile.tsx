import React from 'react';
import ProfileInfo, {ProfilePropsType} from './ProfileInfo/ProfileInfo';
import style from './Profile.module.css'
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

export const Profile = (props: ProfilePropsType) => {
    return (
        <div className={style.profile}>
            <ProfileInfo
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </div>
    )
}