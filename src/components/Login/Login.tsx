import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormsControl/FormsControls';

import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {AuthType, login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import style from '../common/FormsControl/FormsControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type FormOwnDataType = {
    captchaUrl: string | null
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captchaUrl: string | null) => void
}
type MapStateToPropsType = {
    auth: AuthType
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: state.auth
    }
}
type LoginPropsType = MapDispatchToPropsType & MapStateToPropsType

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

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.auth.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={props.auth.captchaUrl}/>
        </div>
    )
}

export default connect(mapStateToProps, {login})(Login)

