import React, { useState, useContext, useEffect } from 'react'
import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { boardReducer } from '../reducer/boardReducer'
export const BoardContext = createContext()
const BoardContextProvider = ({ children }) => {
    const [boardState, dispatch] = useReducer(boardReducer, {
        board: {},
    })

    const getBoard = async (id) => {
        try {
            const res = await axios.get(`${API_ROOT}/board/${id}`)
            dispatch({
                type: 'GET_BOARD',
                payload: response.data.data,
            })
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: error.message }
        }
    }
    // useEffect((id) => {
    //     getBoard(id)
    // }, [])
    const createTask = async (nameTask, columnId, boardId) => {
        const newTask = await action.createNewTask({
            boardId,
            columnId,
            title: nameTask,
        })
        const res = await axios.post(`${API_ROOT}/task`, newTask)
        if (res.status) {
            dispatch({
                type: 'CREATE_TASK',
                payload: res.data,
            })
        }
    }
    const createColumn = async (nameColumn, boardId) => {}
    const updateColumn = async (columnId, title) => {}
    const deleteColumn = async (columnId) => {}
    const dropColumn = async (dragResult, boardId) => {}
    const dropTask = async (dragResult, columnId, boardId) => {}

    return <BoardContext.Provider>{children}</BoardContext.Provider>
}

export default BoardContextProvider
