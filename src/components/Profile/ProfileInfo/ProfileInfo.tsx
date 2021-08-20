import React from 'react';
import style from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileAPIType} from '../../../redux/profile-reducer';
import facebook from '../../../img/facebook.svg'
import instagram from '../../../img/instagram.svg'
import userPhoto from '../../../img/user.jpg';
import {ProfileStatusWithHooks} from '../ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus}: ProfileAPIType) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <div className={style.img}>
                    <img
                        src={profile.photos.large ? profile.photos.large : userPhoto} alt="Ava"/>
                </div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <div className={style.name}>
                    {profile.fullName}
                </div>
                <div>
                    <div className={style.job}>
                        <b>Looking For A Job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
                    </div>
                    <div className={style.status}>
                        <b>{profile.lookingForAJobDescription}</b>
                    </div>
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
            </div>
        </div>
    )
}

export default ProfileInfo;