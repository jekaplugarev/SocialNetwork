import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../img/user.jpg';
import {UsersPageType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

type UsersPropsType = {
    usersPage: UsersPageType
    onPageChanged: (p: number) => void
    follow: (id: string) => void
    unfollow: (id: string) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: string) => void
    followingInProgress: Array<string>
}

export const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.usersPage.totalUsersCount / props.usersPage.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div className={style.pages}>
            {pages.map(p => {
                    return (
                        <span
                            className={props.usersPage.currentPage === p ? style.selectedPage : style.page}
                            onClick={() => {
                                props.onPageChanged(p)
                            }}>
                            {p}
                    </span>
                    )
                }
            )}
        </div>
        {
            props.usersPage.users.map(u => <div key={u.id} className={style.userItem}>
                <div className={style.userFollow}>
                    <div className={style.userPhoto}>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="AvatarPhoto"/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed ?
                            <button
                                className={style.userBtnUnfollow}
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.toggleIsFollowingProgress(true, u.id)
                                    axios
                                        .delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                            withCredentials: true,
                                            headers: {
                                                'API-KEY': '93be5525-4158-48f5-a22c-be58fb0f3c6f'
                                            }
                                        })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }
                                            props.toggleIsFollowingProgress(false, u.id)
                                        })
                                }}
                            >
                                Unfollow
                            </button> :
                            <button
                                className={style.userBtn}
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.toggleIsFollowingProgress(true, u.id)
                                    axios
                                        .post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                            withCredentials: true,
                                            headers: {
                                                'API-KEY': '93be5525-4158-48f5-a22c-be58fb0f3c6f'
                                            }
                                        })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.follow(u.id)
                                            }
                                            props.toggleIsFollowingProgress(false, u.id)
                                        })
                                }}
                            >
                                Follow
                            </button>
                        }
                    </div>
                </div>
                <div className={style.user}>
                    <div className={style.userName}>
                        <div className={style.name}>
                            {u.name}
                        </div>
                        <div className={style.status}>
                            {u.status}
                        </div>
                    </div>
                    <div className={style.address}>
                        <div className={style.city}>
                            {'u.location.city'}
                        </div>
                        <div className={style.country}>
                            {'u.location.country'}
                        </div>
                    </div>
                </div>
            </div>)
        }
    </div>
}