import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../img/user.jpg';
import {UsersPageType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';

type UsersPropsType = {
    usersPage: UsersPageType
    onPageChanged: (p: number) => void
    follow: (id: string) => void
    unfollow: (id: string) => void
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
                                onClick={() => {props.unfollow(u.id)}}
                            >
                                Unfollow
                            </button> :
                            <button
                                className={style.userBtn}
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {props.follow(u.id)}}
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
                    {/*<div className={style.address}>*/}
                        {/*<div className={style.city}>*/}
                        {/*    {'u.location.city'}*/}
                        {/*</div>*/}
                        {/*<div className={style.country}>*/}
                        {/*    {'u.location.country'}*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>)
        }
    </div>
}