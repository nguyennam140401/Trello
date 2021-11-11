import React, { useState, useEffect } from 'react'
import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { postReducer } from '../reducers/postReducer'
import * as action from '../actions/apiCall'
export const HomeContext = createContext()
const homeProvider = ({ children }) => {
    const [homeState, sethomeState] = useState([])
    useEffect(async () => {
        const allBoard = await action.getAllBoard()
    }, [])
}
