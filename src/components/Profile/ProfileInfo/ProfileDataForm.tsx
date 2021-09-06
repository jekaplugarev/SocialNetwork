import React from 'react';
import style from './ProfileInfo.module.css';
import {createField, Input} from '../../common/FormsControl/FormsControls';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {ProfileUpdateType} from '../../../redux/profile-reducer';
import {required} from '../../../utils/validators/validators';

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
                {createField('Full name', 'fullName', [required], Input)}
            </div>
            <div className={style.edit}>
                <b>Looking For A Job</b>:
                {createField('Looking For A Job', 'lookingForAJob', [required], Input, {type: 'checkbox'})}
            </div>
            <div className={style.edit}>
                <b>My professional skills</b>:
                {createField('My professional skills', 'lookingForAJobDescription', [required], Input)}
            </div>
            <div className={style.edit}>
                <b>Facebook</b>:
                {createField('Facebook', 'contacts.facebook', [required], Input)}
            </div>
            <div className={style.edit}>
                <b>Instagram</b>:
                {createField('Instagram', 'contacts.instagram', [required], Input)}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileUpdateType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm