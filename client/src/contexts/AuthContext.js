import react, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import * as action from '../actions/apiCall'
import { API_ROOT } from '../util/constand'
import setAuthToken from '../util/setAuthAction'
export const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        authLoading: true,
        isAuthenticated: false,
        user: null,
    })
    const loaderUser = async () => {
        if (localStorage['tokenUser']) {
            setAuthToken(localStorage['tokenUser'])
        }
        try {
            const res = await axios.get(`${API_ROOT}/auth/`)
            if (res.data.success) {
                setAuthState({
                    ...authState,
                    isAuthenticated: true,
                    authLoading: false,
                    user: res.data.data,
                })
            }
        } catch (err) {
            localStorage.removeItem('tokenUser')
            setAuthToken(null)
            setAuthState({
                ...authState,
                isAuthenticated: false,
                authLoading: false,
                user: null,
            })
        }
    }
    useEffect(() => {
        loaderUser()
    }, [])
    const login = async (data) => {
        const res = await action.login(data)

        if (res.data.success) {
            localStorage.setItem('tokenUser', res.data.acessToken)
            loaderUser()
            return res.data
        } else {
            console.log(res.data)
        }
    }
    const register = async (data) => {
        const res = await action.register(data)
        if (res.data.success) {
            console.log('Dang ki thanh cong')
            return { success: true, message: 'Dang ki thanhf cong' }
        } else {
            console.log(res.data)
        }
    }
    const logout = () => {
        localStorage.removeItem('tokenUser')
        setAuthState({
            ...authState,
            isAuthenticated: false,
            user: null,
        })
    }
    const authContextData = { login, logout, register, authState }
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider
