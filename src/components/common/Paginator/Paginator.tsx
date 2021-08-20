import React from 'react';
import style from './Paginator.module.css';

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = ({currentPage, onPageChanged, pageSize, totalUsersCount}: PaginatorPropsType) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map(p => {
            return <span
                className={currentPage === p ? style.selectedPage : style.page}
                onClick={() => {
                    onPageChanged(p)
                }}>{p}
            </span>
        })}
    </div>
}