import React from 'react';
import style from './ProfileInfo.module.css';
import {createField, Input} from '../../common/FormsControl/FormsControls';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {ProfileUpdateType} from '../../../redux/profile-reducer';


const ProfileDataForm: React.FC<InjectedFormProps<ProfileUpdateType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div className={style.edit}>
                <b>Full name</b>:
                {createField('Full name', 'fullName', Input)}
            </div>
            <div className={style.edit}>
                <b>Looking For A Job</b>:
                {createField('Looking For A Job', 'lookingForAJob', Input, {type: 'checkbox'})}
            </div>
            <div className={style.edit}>
                <b>My professional skills</b>:
                {createField('My professional skills', 'lookingForAJobDescription', Input)}
            </div>
            <div className={style.edit}>
                <b>Facebook</b>:
                {createField('Facebook', 'contacts.facebook', Input)}
            </div>
            <div className={style.edit}>
                <b>Instagram</b>:
                {createField('Instagram', 'contacts.instagram', Input)}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileUpdateType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm