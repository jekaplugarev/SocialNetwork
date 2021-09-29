import React from 'react';
import {AppHeader} from './AppHeader';
import {connect} from 'react-redux';
import {AuthType, logout} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';

type MapDispatchToPropsType = {
    logout: () => void
}
type MapStateToPropsType = {
    auth: AuthType
}
export type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    render() {
        return (
            <AppHeader {...this.props}/>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(HeaderContainer);