import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import MyBoardCard from './MyBoardCard'
import MyBoardIdeaCard from './MyBoardIdeaCard'
import AddBoardForm from './AddBoardForm'
import {Button} from 'reactstrap';
import './MyBoards.css'
//Alertify
import alertify from 'alertifyjs'
import '../../alertify.css'


class MyBoards extends Component {

    state = {
        userId: 0,
        boardList: [],
        searchText: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    reload = () => {
        APIManager.getAllByConditionAndExpand("boards", "userId", this.state.userId, "user")
            .then((boards) => {
                this.setState({ boardList: boards })
            })
    }

    componentDidMount() {
        let returnedStorage = localStorage.getItem('credentials')
        let currentUser = JSON.parse(returnedStorage)
        APIManager.getAllByCondition("users", "email", currentUser.email)
            .then((users) => {
                this.setState({ userId: users[0].id })
                APIManager.getAllByConditionAndExpand("boards", "userId", this.state.userId, "user")
                    .then((boards) => {
                        this.setState({ boardList: boards })
                    })
            })
    }

    sendAlertify = (message) => {
        alertify.warning(message)
    }

    searchForBoards = () => {
        if (this.state.searchText === "") {
            alertify.warning("Please type in something in the search.")
        }
        else {
            let returnedStorage = localStorage.getItem('credentials')
            let currentUser = JSON.parse(returnedStorage)
            APIManager.getAllByCondition("users", "email", currentUser.email)
                .then((users) => {
                    this.setState({ userId: users[0].id })
                    APIManager.getAllByTwoConditionsAndExpand("boards", "userId", this.state.userId, "subjectName_like", this.state.searchText, "user")
                        .then((boards) => {
                            this.setState({ boardList: boards })
                        })
                })
        }
    }

    render() {
        return (
            <>
                <article className="myboards-container">
                    <h1>My Boards</h1>
                    <div className="myboards-header">

                        <div className="searchbar-container">
                            <input className="searchbar" type="text" onChange={this.handleFieldChange} id="searchText" />
                            <Button className="search-button" onClick={this.searchForBoards}>Search</Button>
                        </div>

                        <div className="addboard-container">
                            <AddBoardForm key={this.state.userId + "addbutton"} userId={this.state.userId} reload={this.reload} sendAlertify={this.sendAlertify} {...this.props} />
                        </div>

                    </div>
                    <div className="myboards-body">
                        <div className="board-card-container">
                            {this.state.boardList.map(board =>
                                <div className="board-card" key={board.id + "container"}>
                                    <MyBoardCard
                                        board={board}
                                        {...this.props} />
                                    <MyBoardIdeaCard boardId={board.id} {...this.props} />
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </>
        )
    }
}

export default MyBoards