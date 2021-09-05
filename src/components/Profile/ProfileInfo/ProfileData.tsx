import style from './ProfileInfo.module.css';
import facebook from '../../../img/facebook.svg';
import instagram from '../../../img/instagram.svg';
import React from 'react';
import {ProfileDataType} from './ProfileInfo';

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataType) => {
    return (
        <>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}
            <div className={style.name}>
                {profile.fullName}
            </div>
            <div>
                <div className={style.job}>
                    <b>Looking For A Job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
                </div>
                {profile.lookingForAJob &&
                <div className={style.status}>
                    <b>{profile.lookingForAJobDescription}</b>
                </div>
                }
            </div>
            <div className={style.contacts}>
                <div>
                    <img src={facebook} alt="facebook"/>
                    <a href={profile.contacts.facebook}>
                        {profile.contacts.facebook ? profile.contacts.facebook : 'I am not here'}
                    </a>
                </div>
                <div>
                    <img src={instagram} alt="instagram"/>
                    <a href={profile.contacts.instagram}>
                        {profile.contacts.instagram ? profile.contacts.instagram : 'I am not here'}
                    </a>
                </div>
            </div>
        </>)
}

export default ProfileData;