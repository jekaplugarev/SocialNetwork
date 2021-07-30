import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AuthType, getAuthUserData, logout} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';

type MapDispatchToPropsType = {
    getAuthUserData: () => void
    logout: () => void
}
type MapStateToPropsType = {
    auth: AuthType
}
export type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    auth: state.auth
})

export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);