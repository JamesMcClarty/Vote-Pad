import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import MyBoardCard from './MyBoardCard'
import MyBoardIdeaCard from './MyBoardIdeaCard'


class MyBoards extends Component {

    state = {
        userId: 0,
        boardList: []
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
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

    render() {
        return (
            <>
                <article className="myboards-container">
                    <div className="myboards-header">

                        <div className="searchbar-container">
                            <input className="searchbar" type="text" />
                            <button className="search-button" >Search</button>
                        </div>

                        <div className="addboard-container">
                            <button className="addboard-button">AddBoard</button>
                        </div>

                    </div>
                    <div className="myboards-body">
                        <div className="board-card-container">
                            {this.state.boardList.map(board =>
                                <MyBoardCard key={board.id + "boardCard"} 
                                board = {board} 
                                {...this.props} />
                            )}
                             {this.state.boardList.map(board =>
                                <MyBoardIdeaCard key={board.id + "boardIdeaCard"} boardId={board.id} {...this.props} />
                            )}

                        </div>
                    </div>
                </article>
            </>
        )
    }
}

export default MyBoards