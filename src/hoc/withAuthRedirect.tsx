import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../redux/redux-store';
import {AuthPropertiesType} from '../redux/auth-reducer';

type MapStateToPropsType = {
    auth: AuthPropertiesType
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: state.auth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsType) => {
        let {auth, ...restProps} = props
        // if (!auth.isAuth) return <Redirect to='/login'/>
        return <Component {...restProps as T}/>
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}
