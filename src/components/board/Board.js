import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import BoardIdeaCard from './BoardIdeaCard'
import './Board.css'


class Board extends Component {

    state = {
        subjectName: "",
        subjectEmail: "",
        userName: "",
        ideas: [],
        boardState: "",
        boardStateId: 0,
        showSelected: false
    };

    componentDidMount() {
        APIManager.getOneExpandAndEmbed("boards", this.props.match.params.boardId, "ideas", "user")
            .then((data) => {
                this.setState({subjectName: data.subjectName, userName: data.user.username, subjectEmail: data.user.email, ideas: data.ideas })
                APIManager.getOneDataExpandAnother("boards", this.props.match.params.boardId, "boardstate")
                    .then((newData) => {
                        this.setState({ boardState: newData.boardstate.state, boardStateId: newData.boardstate.id })
                    })
            })
    }

    deleteIdea = ideaId => {
        APIManager.delete("ideas", ideaId)
        .then(() =>{
            APIManager.getOneDataEmbedAnother("boards", this.props.match.params.boardId, "ideas")
            .then(data => {
                this.setState({ideas:data.ideas})
                APIManager.getOneDataExpandAnother("boards", this.props.match.params.boardId, "boardstate")
                    .then((newData) => {
                        this.setState({ boardState: newData.boardstate.state, boardStateId: newData.boardstate.id })
                    })
            })
        })
    }

    switchToSelected = () => {
        this.setState({ showSelected: true })
    }

    switchToUnselected = () => {
        this.setState({ showSelected: false })
    }

    render() {
        const ideasChose = []

        this.state.ideas.forEach(idea => {
            if (idea.isChosen === this.state.showSelected) {
                ideasChose.push(idea)
            }
        });

        let returnedStorage = localStorage.getItem('credentials')
        let currentUser = JSON.parse(returnedStorage)
        const isCurrentBoardUser = currentUser.email === this.state.subjectEmail

        return (
            <article className="board-containter">
                <div className="subject-containter">
                    <h1 className="board-subject-name">{this.state.subjectName}</h1>
                    <p className="board-subject-user">By {this.state.userName}</p>
                </div>
                <div className="main-board-container">
                    <div className="note-board-header">
                        <div className="board-tabs-container">
                            <button className="board-tab" onClick={this.switchToUnselected}>Unselected</button>
                            <button className="board-tab" onClick={this.switchToSelected}>Selected</button>
                            <h3 className="status">Status: {this.state.boardState}</h3>
                        </div>
                        <div>

                            {isCurrentBoardUser ? (
                                <>
                                    <button className="">Edit Board</button>
                                </>
                            ) : (
                                    <>
                                        <button className="">Submit Idea</button>
                                    </>
                                )}
                        </div>
                    </div>
                    <div className="note-board">
                        {ideasChose.map(idea => <BoardIdeaCard
                            key={idea.id}
                            idea={idea} boardState={this.state.boardStateId}
                            isCurrentBoardUser={isCurrentBoardUser}
                            subjectEmail={this.state.subjectEmail}
                            deleteIdea={this.deleteIdea}
                            {...this.props} />)}
                    </div>
                </div>
            </article>
        )
    }
}

export default Board