import {Redirect} from 'react-router-dom';
import React from 'react';
import {AppStateType} from '../redux/redux-store';
import {connect} from 'react-redux';

const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: state.auth
    }
}

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component<any, any> {
        render() {
            if (!this.props.auth.isAuth) {
                return <Redirect to = {'/login'}/>
            }
            return <Component {...this.props}/>

            let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent)

            return ConnectedAuthRedirectComponent
        }
    }
}