import React from 'react'
import './ToolBar.scss'
const ToolBar = ({ boardName }) => {
    return (
        <div className="tools_bar">
            <h1>{boardName}</h1>
        </div>
    )
}

export default ToolBar
