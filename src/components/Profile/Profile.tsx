import React from 'react';
import {StoreType} from '../../redux/store';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import style from './Profile.module.css'
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

// export type ProfileType = {
//     store: StoreType
// }

export const Profile = () => {
    return (
        <div className={style.profile}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}