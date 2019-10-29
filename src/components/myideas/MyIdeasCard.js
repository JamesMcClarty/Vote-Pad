import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
//Alertify
import alertify from 'alertifyjs'
import '../../alertify.css'

class MyIdeasCard extends Component {

    state = {
        boardSubject:"None"
    }

    componentDidMount(){
        APIManager.getOne("boards", this.props.idea.boardId)
        .then(boardData => {
            console.log(boardData)
            this.setState({boardSubject:boardData.subjectName})
        })
    }

    render() {

        var upvotes = 0;
        var downvotes = 0;
        this.props.idea.votes.forEach(vote => {
            if (vote.typeId === 1) {
                upvotes++;
            }
            else {
                downvotes++;
            }
        });

        return (
            <>
                <div className="idea-card">
                    <div className = "idea-header">
                        <h5>{this.state.boardSubject}</h5>
                        </div>
                    <div className="idea-body">
                        <p className="idea-description">{this.props.idea.description}</p>
                    </div>
                    <div className="idea-footer">
                        <div className="mark-containers">
                            <div className="checkmark-container">
                                <button className="checkmark" disabled = {true}></button>
                                <p className="checkmark-votes">{upvotes}</p>
                            </div>
                            <div className="xmark-container">
                                <button className="xmark" disabled = {true}></button>
                                <p className="xmark-votes">{downvotes}</p>
                            </div>
                            {this.props.idea.isChosen ?(
                                    <p>Accepted: Yes!</p>
                                ):
                                (
                                    <p>Accepted: No...</p>
                                )
                            }
                        </div>
                        <div className="button-container">
                        <button type="button"
                            onClick={() => {this.props.history.push(`/boards/${this.props.idea.boardId}/details`)}}>GO TO BOARD</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default MyIdeasCard