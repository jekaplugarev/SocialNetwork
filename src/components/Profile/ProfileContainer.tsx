import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {getStatus, getUserProfile, ProfilePageType, updateStatus, savePhoto} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

type MapStateToPropsType = {
    profile: ProfilePageType
    authorizedUserId: number | null
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: () => void
}

export type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component <PropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        !userId && (userId = String(this.props.authorizedUserId))

        this.props.getUserProfile(+userId)
        this.props.getStatus(+userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
        this.refreshProfile()
    }

    render() {
        return <Profile
            {...this.props}
            isOwner={! this.props.match.params.userId}
            profile={this.props.profile.profile}
            status={this.props.profile.status}
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
        />
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage,
    authorizedUserId: state.auth.id
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)