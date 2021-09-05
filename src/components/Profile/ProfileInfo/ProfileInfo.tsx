import React, {ChangeEvent, useState} from 'react';
import style from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import userPhoto from '../../../img/user.jpg';
import {ProfileStatusWithHooks} from '../ProfileStatusWithHooks';
import {ProfileType, ProfileUpdateType} from '../../../redux/profile-reducer';
import ProfileData from './ProfileData';
import ProfileDataForm from './ProfileDataForm';

export type ProfilePropsType = {
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileUpdateType) => void
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

export type ProfileDataType = {
    profile: {
        userId: number
        lookingForAJob: boolean
        lookingForAJobDescription: string | null
        fullName: string
        contacts: {
            github: string
            vk: string
            facebook: string
            instagram: string
            twitter: string
            website: string
            youtube: string
            mainLink: string
        }
        photos: {
            small: string
            large: string
        }
    }
    isOwner?: boolean
    goToEditMode?: () => void
    initialValues?: any
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfilePropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<any>) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileUpdateType) => {
        saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <div className={style.img}>
                    <img src={profile.photos.large || userPhoto} alt="Ava"/>
                </div>
                {isOwner && <div>
                    <div>Change avatar</div>
                    <input type={'file'} onChange={onMainPhotoSelected} placeholder={'File'}/></div>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

                {editMode ? <ProfileDataForm
                        initialValues={profile}
                        onSubmit={onSubmit}/> :
                    <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}
            </div>
        </div>
    )
}

export default ProfileInfo