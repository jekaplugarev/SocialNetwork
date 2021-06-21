import {connect} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {followAC, setUsersAC, unfollowAC, UsersDataType, UsersPageType} from '../../redux/users-reducer';

type MapStateToPropsType = {
    usersPage: UsersPageType
}

type MapDispatchToPropsType = {
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setUsers: (users: UsersDataType) => void
}

export type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userID: string) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID: string) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users: UsersDataType) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)