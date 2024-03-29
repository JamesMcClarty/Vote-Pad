import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import BoardListCard from './BoardListCard'
import MyBoardIdeaCard from '../myboards/MyBoardIdeaCard'
import {Button} from 'reactstrap';
//Alertify
import alertify from 'alertifyjs'
import '../../alertify.css'




class BoardList extends Component {

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
        APIManager.getAllByConditionAndExpand("boards", "userId_ne", this.state.userId, "user")
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
                APIManager.getAllByConditionAndExpand("boards", "userId_ne", this.state.userId, "user")
                    .then((boards) => {
                        this.setState({ boardList: boards })
                    })
            })
    }

    searchForBoards = () => {
        if(this.state.searchText === ""){
            alertify.warning("Please type in something in the search.")
        }
        else{
        let returnedStorage = localStorage.getItem('credentials')
        let currentUser = JSON.parse(returnedStorage)
        APIManager.getAllByCondition("users", "email", currentUser.email)
            .then((users) => {
                this.setState({ userId: users[0].id })
                APIManager.getAllByTwoConditionsAndExpand("boards", "userId_ne", this.state.userId, "subjectName_like", this.state.searchText, "user")
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
                <h1 className="myboardstitle">Board List</h1>
                    <div className="myboards-header">

                        <div className="searchbar-container">
                            <input className="searchbar" type="text" onChange={this.handleFieldChange} id = "searchText"/>
                            <Button className="search-button" onClick={this.searchForBoards}>Search</Button>
                        </div>
                    </div>
                    <div className="myboards-body">
                        <div className="board-card-container">
                            {this.state.boardList.map(board =>
                                <div key={board.id}>
                                    <div className="board-card">
                                        <BoardListCard
                                            board={board}
                                            userId={this.state.userId}
                                            {...this.props} />
                                        <MyBoardIdeaCard boardId={board.id} {...this.props} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </>
        )
    }
}

export default BoardList