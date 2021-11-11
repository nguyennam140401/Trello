import React from 'react'
import { Link } from 'react-router-dom'
import './BoardItem.scss'
const BoardItem = ({ title, id }) => {
    return (
        <div className="board_item">
            <Link to={`/board/${id}`}>
                <div className="board_item-contain">
                    <div className="board_item-name">
                        <h5>{title}</h5>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BoardItem
