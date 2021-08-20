import React from 'react';
import style from './Users.module.css';
import {UsersType} from '../../redux/users-reducer';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';

type UsersPropsType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followingInProgress: number[]
}

export const Users = ({
                          currentPage,
                          follow,
                          followingInProgress,
                          onPageChanged,
                          pageSize,
                          totalUsersCount,
                          unfollow,
                          users
                      }: UsersPropsType) => {

    const userList = users.map(u => <User
        key={u.id}
        user={u}
        follow={follow}
        unfollow={unfollow}
        followingInProgress={followingInProgress}/>)

    return (
        <div>
            <div className={style.pages}>
                <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize}
                           totalUsersCount={totalUsersCount}/>
            </div>

            {userList}
        </div>)
}