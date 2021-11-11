import React, { useState, useEffect, useContext } from 'react'
import './login.scss'
import { useHistory, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const formLogin = async (event) => {
        event.preventDefault()
        try {
            const loginData = await login({ username, password })

            if (loginData.success) {
                history.push('/')
            } else {
                console.log('Co loi roi')
            }
        } catch (err) {
            console.log(err)
        }
    }
    const history = useHistory()
    const { login } = useContext(AuthContext)
    return (
        <div>
            <div class="wrapper">
                <form class="form-signin" onSubmit={formLogin}>
                    <h2 class="form-signin-heading">Please login</h2>
                    <input
                        type="text"
                        class="form-control"
                        name="username"
                        placeholder="Email Address"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required=""
                        autofocus=""
                    />
                    <input
                        type="password"
                        class="form-control"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required=""
                    />
                    <br />

                    <button
                        class="btn btn-lg btn-primary btn-block"
                        type="submit"
                    >
                        Login
                    </button>
                    <p>
                        Bạn chưa có tài khoản ?{' '}
                        <Link to="/register">Đăng kí ngay</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
