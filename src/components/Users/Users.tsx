import React, {useEffect} from 'react';
import style from './Users.module.css';
import {FilterType, follow, requestUsers, setCurrentPage, unfollow} from '../../redux/users-reducer';
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
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";

type QueryParamsType = { term?: string, page?: string, friend?: string }

export const Users: React.FC = () => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followUser = (userID: number) => {
        dispatch(follow(userID))
    }
    const unfollowUser = (userID: number) => {
        dispatch(unfollow(userID))
    }

    const userList = users.map(u => <User
        key={u.id}
        user={u}
        followUser={followUser}
        unfollowUser={unfollowUser}
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