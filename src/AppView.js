import { Route, Redirect } from "react-router-dom"
import React, { Component } from 'react'
import Login from './components/auth/Login'
import Home from './components/home/Home'
import Board from './components/board/Board'
import BoardList from './components/boardlist/BoardList'
import MyBoards from './components/myboards/MyBoards'
import MyIdeas from './components/myideas/MyIdeas'
import Registration from './components/auth/Registration'

class AppView extends Component {

    render() {
        return (
            <>
                
                <Route exact path="/" render={(props) => {
                    if (this.props.user) {
                        return <Home {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/login" render={(props) => {
                    return <Login {...props} setUser={this.props.setUser}/>
                }} />
                <Route exact path="/register" render={(props) => {
                    return <Registration {...props} setUser={this.props.setUser}/>
                }} />

                <Route exact path="/boards/:boardId(\d+)/details" render={(props) => {
                    if (this.props.user) {
                        return <Board {...props}/>
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }}/>
                <Route exact path="/myboards" render={(props) => {
                    if (this.props.user) {
                        return <MyBoards {...props}/>
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }}/>
                <Route exact path="/boardlist" render={(props) => {
                    if (this.props.user) {
                        return <BoardList {...props}/>
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }}/>
                <Route exact path="/myideas" render={(props) => {
                    if (this.props.user) {
                        return <MyIdeas {...props}/>
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }}/>
            </>
        )
    }
}

export default AppView