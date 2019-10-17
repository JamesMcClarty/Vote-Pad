import { Route, withRouter, Redirect } from "react-router-dom"
import React, { Component } from 'react'
import Login from './components/auth/Login'
import Home from './components/home/Home'

class AppView extends Component {

    render() {
        return (
            <>
                <Route exact path="/login" render={(props) => {
                    return <Login />
                }} />

                <Home exact path="/" render={(props) => {
                    if (this.props.user) {
                        return <Home {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
            </>
        )
    }
}

export default AppView