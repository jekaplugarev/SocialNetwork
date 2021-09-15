import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormsControl/FormsControls';
import {required} from '../../utils/validators/validators';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import style from '../common/FormsControl/FormsControls.module.css'

export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export type FormOwnDataType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, FormOwnDataType> & FormOwnDataType> = ({
                                                                                                     error,
                                                                                                     handleSubmit,
                                                                                                     captchaUrl
                                                                                                 }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            {createField('RememberMe', 'rememberMe', [required], Input, {type: 'checkbox'}, 'Remember Me')}
            {captchaUrl && <img src={captchaUrl} alt="Captcha" style={{width: '200px'}}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>
                    Login
                </button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, FormOwnDataType>({form: 'login'})(LoginForm)

export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={captchaUrl}
            />
        </div>
    )
}