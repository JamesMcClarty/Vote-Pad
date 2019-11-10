import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import {Button} from 'reactstrap';

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
                                <button className="checkmark-0" disabled = {true}></button>
                                <p className="checkmark-votes">{upvotes}</p>
                            </div>
                            <div className="xmark-container">
                                <button className="xmark-0" disabled = {true}></button>
                                <p className="xmark-votes">{downvotes}</p>
                            </div>
                        </div>
                        <div className="button-container">
                        <Button type="button"
                            onClick={() => {this.props.history.push(`/boards/${this.props.idea.boardId}/details`)}}>ATTEND</Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default MyIdeasCard