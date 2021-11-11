import React, { useState, useEffect, useContext } from 'react'
import './Home.scss'

import * as action from '../../actions/apiCall'
import BoardItem from '../BoardItem/BoardItem'
import { useParams } from 'react-router'

const Home = () => {
    const [allBoard, setAllBoard] = useState([])
    useEffect(() => {
        action.getAllBoard().then((boards) => {
            setAllBoard(boards.data)
        })
    }, [])
    const [showFormBoard, setShowFormBoard] = useState(false)
    const [nameBoard, setNameBoard] = useState('')
    const createBoard = async () => {
        const newBoard = await action.createBoard({ title: nameBoard })
        setAllBoard([...allBoard, newBoard])
        setNameBoard('')
        setShowFormBoard(false)
    }

    return (
        <div className="home">
            {showFormBoard && (
                <div
                    div
                    className="form_popUp"
                    onClick={() => setShowFormBoard(false)}
                >
                    <div className="form" onClick={(e) => e.stopPropagation()}>
                        <div className="form_group">
                            <input
                                type="text"
                                placeholder="Tiêu đề bảng"
                                value={nameBoard}
                                onChange={(e) => {
                                    setNameBoard(e.target.value)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        createBoard()
                                    }
                                }}
                            />
                            <button onClick={() => setShowFormBoard(false)}>
                                x
                            </button>
                        </div>
                        <p>
                            không gian làm việc của Nguyễn Văn Nam Hiển thị
                            trong Không gian làm việc
                        </p>
                    </div>
                </div>
            )}
            <ul className="list_board">
                {allBoard.map((board, idx) => (
                    <li key={idx}>
                        <BoardItem title={board.title} id={board._id} />
                    </li>
                ))}
                <div
                    className="addBoard"
                    onClick={() => setShowFormBoard(true)}
                >
                    <h3>Tạo bảng mới</h3>
                </div>
            </ul>
        </div>
    )
}

export default Home
