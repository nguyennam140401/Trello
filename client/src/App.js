import './App.scss'
import React from 'react'
import Navbar from './components/Navbar/Navbar'

import Dashboard from './components/Dashboard/Dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import AuthContextProvider from './contexts/AuthContext'
import ProtectRouter from './router/ProtectRouter'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
function App() {
    return (
        <AuthContextProvider>
            <Router>
                <div className="App">
                    <Navbar></Navbar>

                    <ProtectRouter
                        exact
                        path="/"
                        component={Home}
                    ></ProtectRouter>
                    <ProtectRouter
                        exact
                        path="/board/:id"
                        component={Dashboard}
                    ></ProtectRouter>

                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/register" component={Register}></Route>
                </div>
            </Router>
        </AuthContextProvider>
    )
}

export default App
