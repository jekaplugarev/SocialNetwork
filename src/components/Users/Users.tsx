import React from 'react';
import {UsersContainerPropsType} from './UsersContainer';
import style from './Users.module.css'
import {v1} from 'uuid';
import axios from 'axios';
import userPhoto from '../../img/user.jpg'

export const Users: React.FC<UsersContainerPropsType> = (props) => {
    if (props.usersPage.users.length === 0) {
        axios
            .get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
            props.setUsers(response.data.items)
        })
        // props.setUsers([
        //     {
        //         id: v1(),
        //         photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU',
        //         followed: false,
        //         fullName: 'Dima',
        //         status: 'I am here',
        //         location: {
        //             city: 'Minsk',
        //             country: 'Belarus'
        //         }
        //     },
        //     {
        //         id: v1(),
        //         photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU',
        //         fullName: 'Jeka',
        //         followed: false,
        //         status: 'I am a boss',
        //         location: {
        //             city: 'Angarsk',
        //             country: 'Russia'
        //         }
        //     },
        //     {
        //         id: v1(),
        //         photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU',
        //         fullName: 'Katy',
        //         followed: true,
        //         status: 'Hi !',
        //         location: {
        //             city: 'Kiev',
        //             country: 'Ukraine'
        //         }
        //     }
        // ])
    }
    return (
        <div>
            {
                props.usersPage.users.map(u => <div key={u.id} className={style.userItem}>
                    <div className={style.userFollow}>
                        <div className={style.userPhoto}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="AvatarPhoto"/>
                        </div>
                        <div>
                            {u.followed ?
                                <button
                                    className={style.userBtn}
                                    onClick={() => {
                                        props.unfollow(u.id)
                                    }}
                                >
                                    Unfollow
                                </button> :
                                <button
                                    className={style.userBtn}
                                    onClick={() => {
                                        props.follow(u.id)
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