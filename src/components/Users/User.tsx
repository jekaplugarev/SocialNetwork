import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../img/user.jpg';
import {UsersType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';

type UserPropsType = {
    user: UsersType
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    followingInProgress: number[]
}

export const User: React.FC<UserPropsType> = React.memo((props) => {
    const {
        followUser,
        unfollowUser,
        followingInProgress,
        user
    } = props;

    return <div className={style.userItem}>
        <div className={style.userFollow}>
            <div className={style.userPhoto}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} alt="AvatarPhoto"/>
                </NavLink>
            </div>
            <div>
                {user.followed ?
                    <button
                        className={style.userBtnUnfollow}
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            unfollowUser(user.id)
                        }}
                    >
                        Unfollow
                    </button> :
                    <button
                        className={style.userBtn}
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            followUser(user.id)
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
                    {user.name}
                </div>
                <div className={style.status}>
                    {user.status}
                </div>
            </div>
        </div>
    </div>
})