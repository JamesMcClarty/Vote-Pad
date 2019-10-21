import { Route, withRouter, Redirect } from "react-router-dom"
import React, { Component } from 'react'
import Login from './components/auth/Login'
import Home from './components/home/Home'
import Board from './components/board/Board'
class AppView extends Component {

    render() {
        console.log(this.props.user)
        return (
            <>
                <Route exact path="/login" render={(props) => {
                    return <Login {...props} setUser={this.props.setUser}/>
                }} />

                <Route exact path="/home" render={(props) => {
                    if (this.props.user) {
                        return <Home {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route exact path="/boards/:boardId(\d+)/details" render={(props) => {
                    if (this.props.user) {
                        return <Board {...props} />
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }} />
            </>
        )
    }
}

export default AppView