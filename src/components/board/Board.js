import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import BoardIdeaCard from './BoardIdeaCard'
import './Board.css'


class Board extends Component {

    state = {
        subjectName: "",
        userName: "",
        ideas: [],
        boardState: "",
    };


    componentDidMount() {
        APIManager.getOneExpandAndEmbed("boards", this.props.match.params.boardId, "ideas", "user")
            .then((data) => {
                console.log(data)
                this.setState({ subjectName: data.subjectName, userName: data.user.username,  ideas: data.ideas })
                APIManager.getOneDataExpandAnother("boards", this.props.match.params.boardId, "boardstate")
                    .then((newData) => {
                        this.setState({ boardState: newData.boardstate.state })
                    })
            })
    }

    render() {
        return (
            <article className="board-containter">
                <div className="subject-containter">
                    <h1 className="board-subject-name">{this.state.subjectName}</h1>
                    <p className="board-subject-user">By {this.state.userName}</p>
                </div>
                <div className="main-board-container">
                    <div className="note-board">
                        {this.state.ideas.map(idea => <BoardIdeaCard key={idea.id} idea={idea} {...this.props}/>)}
                    </div>
                </div>
            </article>
        )
    }
}

export default Board