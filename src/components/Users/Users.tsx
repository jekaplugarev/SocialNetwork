import React from 'react';
import {UsersContainerPropsType} from './UsersContainer';
import style from './Users.module.css'
import {v1} from 'uuid';

export const Users: React.FC<UsersContainerPropsType> = (props) => {
    if (props.usersPage.users.length === 0) {
        props.setUsers([
            {
                id: v1(),
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU',
                followed: false,
                fullName: 'Dima',
                status: 'I am here',
                location: {
                    city: 'Minsk',
                    country: 'Belarus'
                }
            },
            {
                id: v1(),
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU',
                fullName: 'Jeka',
                followed: false,
                status: 'I am a boss',
                location: {
                    city: 'Angarsk',
                    country: 'Russia'
                }
            },
            {
                id: v1(),
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU',
                fullName: 'Katy',
                followed: true,
                status: 'Hi !',
                location: {
                    city: 'Kiev',
                    country: 'Ukraine'
                }
            }
        ])
    }
    return (
        <div>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                       <div className={style.userPhoto}>
                           <img src={u.photoUrl} alt="AvatarPhoto"/>
                       </div>
                        <div>
                            {u.followed ?
                                <button
                                    onClick={() => {
                                        props.unfollow(u.id)
                                    }}
                                >
                                    Unfollow
                                </button> :
                                <button
                                    onClick={() => {
                                        props.follow(u.id)
                                    }}
                                >
                                    Follow
                                </button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>
                                {u.fullName}
                            </div>
                            <div>
                                {u.status}
                            </div>
                        </span>
                        <span>
                            <div>
                                {u.location.city}
                            </div>
                            <div>
                                {u.location.country}
                            </div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}