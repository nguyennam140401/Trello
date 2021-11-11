import React, { useState, useEffect, useContext } from 'react'
import Column from '../Column/Column'
import './Dashboard.scss'
import { mapOrder } from '../../util/sort'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from '../../util/drag'
import { useParams } from 'react-router-dom'
import ToolBar from '../ToolBar/ToolBar'
import * as action from '../../actions/apiCall'

const DashBoard = () => {
    const [columnState, setColumnState] = useState([])
    const [boardState, setBoardState] = useState({})
    const [isShowAddColumn, setIsShowAddColumn] = useState(false)
    const [nameNewColumn, setNameNewColumn] = useState('')

    const { id } = useParams()

    useEffect(() => {
        action.fetchBoard(id).then((board) => {
            setBoardState(board.data)
            setColumnState(
                mapOrder(board.data.columns, board.data.columnOrder, '_id')
            )
        })
    }, [id])
    const onColumnDrop = async (dragResult) => {
        // console.log(data)
        let newBoard = { ...boardState }
        let newColumn = [...columnState]
        newColumn = applyDrag(newColumn, dragResult)
        newBoard.columnOrder = newColumn.map((column) => column._id)
        newBoard.columns = newColumn

        setColumnState(newColumn)
        setBoardState(newBoard)
        if (dragResult.addedIndex !== dragResult.removedIndex)
            action
                .updateBoard(newBoard._id, {
                    columnOrder: newBoard.columnOrder,
                })
                .catch(() => {
                    setColumnState(columnState)
                    setBoardState(boardState)
                })
    }
    const onTaskDrop = async (idxColumn, dragResult) => {
        const { removedIndex, addedIndex } = dragResult
        if (removedIndex !== null || addedIndex !== null) {
           

            let newColumn = [...columnState]
            let currentColumn = newColumn.find((x) => x._id === idxColumn)
            currentColumn.tasks = applyDrag(currentColumn.tasks, dragResult)
            currentColumn.taskOrder = currentColumn.tasks.map((x) => x._id)
            setColumnState(newColumn)
            if (removedIndex !== addedIndex) {
                if (removedIndex !== null && addedIndex !== null) {
                    action
                        .updateColumn(currentColumn._id, {
                            taskOrder: currentColumn.taskOrder,
                        })
                        .catch(() => {
                            setColumnState(...columnState)
                        })
                } else {
                    if (addedIndex !== null) {
                        action
                            .updateColumn(currentColumn._id, {
                                taskOrder: currentColumn.taskOrder,
                            })
                            .catch(() => {
                                setColumnState(...columnState)
                            })
                        const taskUpdate = dragResult.payload
                        taskUpdate.columnId = idxColumn
                        action.updateTask(taskUpdate).catch(() => {
                            setColumnState(...columnState)
                        })
                    }
                }
            }
        }
    }
    const toggleForm = () => {
        setIsShowAddColumn(!isShowAddColumn)
    }
    const addNewColumn = async () => {
        const newColumnToAdd = await action.createNewColumn({
            boardId: boardState._id,
            title: nameNewColumn,
        })
        setColumnState([...columnState, newColumnToAdd])
        setBoardState({
            ...boardState,
            columnOrder: [...boardState.columnOrder, newColumnToAdd._id],
            columns: [...boardState.columns, newColumnToAdd],
        })
        setNameNewColumn('')
        setIsShowAddColumn(false)
    }
    const removeColumn = (id) => {
   
        let newColumns = [...columnState]
        let newBoard = { ...boardState }
        newColumns = newColumns.filter((column) => {
            return column._id !== id
        })
        setColumnState(newColumns)
        newBoard.columnOrder = newColumns.map((column) => column._id)
        newBoard.columns = newColumns
        setBoardState(newBoard)
    }
    const changeNameColumn = async (id, title) => {
      
        let newColumns = [...columnState]

        newColumns = newColumns.map((column) => {
            return column._id === id ? { ...column, title } : column
        })
        setColumnState(newColumns)
      
        setBoardState({ ...boardState, columns: newColumns })
    }
    const addColumn = (event) => {
        event.preventDefault()
        addNewColumn()
    }
    const addNewTask = async (idColumn, nameTask) => {
        const newTask = await action.createNewTask({
            boardId: boardState._id,
            columnId: idColumn,
            title: nameTask,
        })
        let newColumns = [...columnState]
        newColumns = newColumns.map((column) => {
            return column._id === idColumn
                ? {
                      ...column,
                      taskOrder: [...column.taskOrder, newTask.data._id],
                      tasks: [...column.tasks, newTask.data],
                  }
                : column
        })
        setColumnState(newColumns)
        setBoardState({ ...boardState, columns: newColumns })
    }
    return (
        <>
            <ToolBar boardName={boardState.title}></ToolBar>
            <div className="dashboard">
                {!columnState ? (
                    <div className="add_column">Add new Column</div>
                ) : (
                    <>
                        <Container
                            orientation="horizontal"
                            onDrop={onColumnDrop}
                            dragHandleSelector=".column-drag-handle"
                            nonDragAreaSelector=".nonDragAreaSelector"
                            getChildPayload={(index) => columnState[index]}
                            dropPlaceholder={{
                                animationDuration: 150,
                                showOnTop: true,
                                className: 'column-drop-preview',
                            }}
                        >
                            {columnState.map((column, idx) => (
                                <Draggable key={idx}>
                                    <Column
                                        removeColumn={removeColumn}
                                        onTaskDrop={onTaskDrop}
                                        column={column}
                                        addNewTask={addNewTask}
                                        changeNameColumn={changeNameColumn}
                                    ></Column>
                                </Draggable>
                            ))}
                        </Container>
                        <div className="add_column">
                            <div onClick={toggleForm}>Add new Column</div>
                            {isShowAddColumn && (
                                <div className="form_input">
                                    <form action="" onSubmit={addColumn}>
                                        <input
                                            type="text"
                                            placeholder="Add Column"
                                            autoFocus
                                            value={nameNewColumn}
                                            onChange={(e) => {
                                                setNameNewColumn(e.target.value)
                                            }}
                                        />
                                        <div className="action">
                                            <button
                                                type="button"
                                                className="btn sub"
                                                onClick={addNewColumn}
                                            >
                                                Add new Column
                                            </button>
                                            <button
                                                onClick={toggleForm}
                                                type="button"
                                                className="btn cancel"
                                            >
                                                x
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default DashBoard
