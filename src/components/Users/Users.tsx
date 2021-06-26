import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../img/user.jpg';
import axios from 'axios';
import {UsersContainerPropsType} from './UsersContainer';

export class Users extends React.Component <UsersContainerPropsType> {
    componentDidMount() {
        axios
            .get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <div>
                {
                    this.props.usersPage.users.map(u => <div key={u.id} className={style.userItem}>
                        <div className={style.userFollow}>
                            <div className={style.userPhoto}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="AvatarPhoto"/>
                            </div>
                            <div>
                                {u.followed ?
                                    <button
                                        className={style.userBtnUnfollow}
                                        onClick={() => {
                                            this.props.unfollow(u.id)
                                        }}
                                    >
                                        Unfollow
                                    </button> :
                                    <button
                                        className={style.userBtn}
                                        onClick={() => {
                                            this.props.follow(u.id)
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
        )
    }
}