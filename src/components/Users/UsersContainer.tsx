import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    FilterType,
    follow,
    requestUsers,
    setCurrentPage,
    toggleIsFollowingProgress,
    unfollow,
    UsersType
} from '../../redux/users-reducer';
import React from 'react';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors';

type MapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    filter: FilterType
}

type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}

export type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component <UsersContainerPropsType> {
    componentDidMount() {
        const {currentPage, pageSize, requestUsers, filter} = this.props
        requestUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        const {requestUsers, pageSize, setCurrentPage, filter} = this.props
        setCurrentPage(pageNumber)
        requestUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize, requestUsers} = this.props
        requestUsers(1, pageSize, filter)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                followingInProgress={this.props.followingInProgress}
                onFilterChanged={this.onFilterChanged}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps,
        {
            follow, unfollow, setCurrentPage, requestUsers, toggleIsFollowingProgress
        }),
)(UsersContainer)