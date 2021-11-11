import React, { useState, useEffect, useContext } from 'react'
import './RegisterStyle.scss'
import { useHistory, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setpasswordConfirm] = useState('')
    const history = useHistory()
    const { register } = useContext(AuthContext)
    const formRegister = async (event) => {
        event.preventDefault()
        try {
            const registerData = await register({ username, password })

            if (registerData.success) {
                alert('Đăng kí thành công')
                history.push('/login')
            } else {
                console.log('Co loi roi')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div class="wrapper">
                <form class="form-signin" onSubmit={formRegister}>
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
                    <input
                        type="password"
                        class="form-control"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={passwordConfirm}
                        onChange={(e) => setpasswordConfirm(e.target.value)}
                        required=""
                    />
                    <br />

                    <button
                        class="btn btn-lg btn-primary btn-block"
                        type="submit"
                    >
                        Register
                    </button>
                    <p>
                        Bạn có tài khoản ?{' '}
                        <Link to="/register">Đăng nhập ngay</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
