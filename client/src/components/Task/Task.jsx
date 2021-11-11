import React from 'react'
import './Task.scss'
const Task = ({ task }) => {
    const { title, cover } = task
    return (
        <div className="task-item">
            {cover ? (
                <img
                    src={cover}
                    onMouseDown={(e) => e.preventDefault()}
                    alt=""
                />
            ) : (
                ''
            )}
            {title}
        </div>
    )
}

export default Task
