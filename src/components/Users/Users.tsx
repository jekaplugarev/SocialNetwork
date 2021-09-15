import React, {useEffect} from 'react';
import style from './Users.module.css';
import {FilterType, requestUsers, setCurrentPage} from '../../redux/users-reducer';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';
import {UsersSearchForm} from "./UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";


export const Users: React.FC = () => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [dispatch, currentPage, pageSize, filter])

    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const follow = (userID: number) => {
        dispatch(follow(userID))
    }
    const unfollow = (userID: number) => {
        dispatch(unfollow(userID))
    }

    const userList = users.map(u => <User
        key={u.id}
        user={u}
        follow={follow}
        unfollow={unfollow}
        followingInProgress={followingInProgress}/>)

    return (
        <div>
            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
            </div>
            <div className={style.pages}>
                <Paginator
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    pageSize={pageSize}
                    totalItemsCount={totalUsersCount}/>
            </div>
            {userList}
        </div>)
}