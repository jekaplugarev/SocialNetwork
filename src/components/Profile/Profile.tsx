import React from 'react';
import {StoreType} from '../../redux/state';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import style from './Profile.module.css'

export type ProfileType = {
    newPostText: string
    store: StoreType
}

const Profile: React.FC<ProfileType> = (props) => {
    return (
        <div className={style.profile}>
            <ProfileInfo/>
            <MyPosts
                store={props.store}
                newPostText={props.newPostText}
            />
        </div>
    )
}

export default Profile;