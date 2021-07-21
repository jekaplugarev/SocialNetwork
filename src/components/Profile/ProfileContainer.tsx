import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {getUserProfile, ProfilePageType} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {AuthPropertiesType} from '../../redux/auth-reducer';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

type MapStateToPropsType = {
    profile: ProfilePageType
    auth: AuthPropertiesType
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
}

export type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component <PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getUserProfile(userId)
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile.profile}/>
    }
}

const AuthRedirectComponent = withAuthRedirect(ProfileContainer)

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage,
    }
}



let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)