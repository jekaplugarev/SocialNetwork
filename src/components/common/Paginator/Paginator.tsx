import React, {useState} from 'react';
import style from './Paginator.module.css';

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionSize?: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = ({currentPage, onPageChanged, pageSize, totalItemsCount, portionSize = 10}: PaginatorPropsType) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return <div>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>Prev</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span
                    key={p}
                    className={currentPage === p ? style.selectedPage : style.page}
                    onClick={() => {
                        onPageChanged(p)
                    }}>{p}
            </span>
            })}
        {portionCount > portionNumber &&
        <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>Next</button>}
    </div>
}