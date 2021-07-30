import React from 'react';
import {InjectedFormProps, reduxForm, Field} from 'redux-form';
import {Input} from '../common/FormsControl/FormsControls';
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
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
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

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={'Email'}
                    name={'email'}
                    component={Input}
                    type={'text'}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    placeholder={'Password'}
                    name={'password'}
                    component={Input}
                    type={'password'}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    component={Input}
                    name={'rememberMe'}
                    type={'checkbox'}
                />Remember me
            </div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>
                    Login
                </button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: LoginPropsType) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.auth.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default connect(mapStateToProps, {login}) (Login)