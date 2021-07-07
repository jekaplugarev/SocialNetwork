import React from 'react';
import style from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileAPIType} from '../../../redux/profile-reducer';
import facebook from '../../../img/facebook.svg'
import instagram from '../../../img/instagram.svg'
import userPhoto from '../../../img/user.jpg';

const ProfileInfo = (props: ProfileAPIType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                {/*<img src="https://imagesbase.ru/uploads/posts/2016-12/1481272915_imagesbase.ru-5254.jpg" alt="Main content"/>*/}
            </div>
            <div className={style.descriptionBlock}>
                <div className={style.img}>
                    <img
                        src={props.profile.photos.large ? props.profile.photos.large : userPhoto} alt="Ava"/>
                </div>
                <div className={style.name}>
                    {props.profile.fullName}
                </div>
                <div>
                    <div className={style.job}>
                        <b>Looking For A Job:</b> {props.profile.lookingForAJob ? 'Yes' : 'No'}
                    </div>
                    <div className={style.status}>
                        <b>Status:</b> {props.profile.lookingForAJobDescription}
                    </div>
                </div>
                <div className={style.contacts}>
                    <div>
                        <img src={facebook} alt="facebook"/>
                        <a href={props.profile.contacts.facebook}>
                            {props.profile.contacts.facebook ? props.profile.contacts.facebook : 'I am not here'}
                        </a>
                    </div>
                    <div>
                        <img src={instagram} alt="instagram"/>
                        <a href={props.profile.contacts.instagram}>
                            {props.profile.contacts.instagram ? props.profile.contacts.instagram : 'I am not here'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;