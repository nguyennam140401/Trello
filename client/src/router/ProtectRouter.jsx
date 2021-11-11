import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/esm/Spinner'
const ProtectRouter = ({ component: Component, ...rest }) => {
    console.log(Component, rest)
    const { authState } = useContext(AuthContext)

    if (authState.authLoading) {
        return (
            <div className="center_box">
                <Spinner animation="border" variant="info" />
            </div>
        )
    }
    return (
        <Route
            {...rest}
            render={(props) =>
                authState.isAuthenticated ? (
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

export default ProtectRouter
