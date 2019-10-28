import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import EditIdeaForm from './EditIdeaForm'
//Alertify
import alertify from 'alertifyjs'
import '../../alertify.css'

class BoardIdeaCard extends Component {

    state = {
        votes: [],
        currentPoster: "",
        userLoggedIn: "",
        userName: "",
        userId: 0
    }

    componentDidMount() {
        let returnedStorage = localStorage.getItem('credentials')
        let currentUser = JSON.parse(returnedStorage)
        this.setState({ userLoggedIn: currentUser.email })
        APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
            .then(data => {
                this.setState({ votes: data.votes })
                APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                    .then(data => {
                        this.setState({ currentPoster: data.user.email, userName: data.user.username, userId: data.user.id })
                    })
            })
    }

    acceptIdea = () => {
        alertify.confirm("This is a confirm dialog.", this.confirmAccept,
            function () {
                
            });
    }

    confirmAccept =()=>{
        const editedObject ={
            id: this.props.idea.id,
            userId: this.props.idea.userId,
            boardId: this.props.idea.boardId,
            description: this.props.idea.description,
            "isChosen": true
          }    
          APIManager.update("ideas", editedObject)
          .then(() =>{
          this.props.reload();
          })
    }

    voteUp = () => {
        var alreadyVoted = false;
        this.state.votes.forEach(vote => {
            if (this.state.userId === vote.userId) {
                alreadyVoted = true;
                if (vote.typeId === 2) {
                    const editedObject = {
                        id: vote.id,
                        ideaId: vote.ideaId,
                        userId: vote.userId,
                        typeId: 1
                    }
                    APIManager.update("votes", editedObject).then(() => {
                        APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
                            .then(data => {
                                this.setState({ votes: data.votes })
                                APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                                    .then(data => {
                                        this.setState({ currentPoster: data.user.email, userName: data.user.username, userId: data.user.id })
                                    })
                            })
                    })
                }
            }
        })
        if (alreadyVoted === false) {
            const newObject = {
                ideaId: this.props.idea.id,
                userId: this.state.userId,
                typeId: 1
            }
            APIManager.post("votes", newObject)
                .then(() => {
                    APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
                        .then(data => {
                            this.setState({ votes: data.votes })
                            APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                                .then(data => {
                                    this.setState({ currentPoster: data.user.email, userName: data.user.username, userId: data.user.id })
                                })
                        })
                }
                )
        }
    }

    voteDown = () => {
        var alreadyVoted = false;
        this.state.votes.forEach(vote => {
            if (this.state.userId === vote.userId) {
                alreadyVoted = true;
                if (vote.typeId === 1) {
                    const editedObject = {
                        id: vote.id,
                        ideaId: vote.ideaId,
                        userId: vote.userId,
                        typeId: 2
                    }
                    APIManager.update("votes", editedObject).then(() => {
                        APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
                            .then(data => {
                                this.setState({ votes: data.votes })
                                APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                                    .then(data => {
                                        this.setState({ currentPoster: data.user.email, userName: data.user.username, userId: data.user.id })
                                    })
                            })
                    })
                }
            }
        })
        if (alreadyVoted === false) {
            const newObject = {
                ideaId: this.props.idea.id,
                userId: this.state.userId,
                typeId: 2
            }
            APIManager.post("votes", newObject)
                .then(() => {
                    APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
                        .then(data => {
                            this.setState({ votes: data.votes })
                            APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                                .then(data => {
                                    this.setState({ currentPoster: data.user.email, userName: data.user.username, userId: data.user.id })
                                })
                        })
                })
        }
    }

    implementStateButtons() {
        if (!this.props.idea.isChosen) {
            if (this.props.isCurrentBoardUser && this.props.boardState !== 1) {
                return <button className="footer-button" onClick={this.acceptIdea}>Accept Idea</button>
            }
            else if (!this.props.isCurrentBoardUser && this.props.boardState === 1 && this.state.currentPoster === this.state.userLoggedIn) {
                return <>
                    <EditIdeaForm idea={this.props.idea} reload={this.props.reload} />
                    <button className="footer-button" onClick={() => this.props.deleteIdea(this.props.idea.id)}>Delete</button>
                </>
            }
            else if (!this.props.isCurrentBoardUser && this.props.boardState === 2 && this.state.currentPoster === this.state.userLoggedIn) {
                return <>
                    <button className="footer-button" onClick={() => this.props.deleteIdea(this.props.idea.id)}>Delete</button>
                </>
            }
            else {
                return <></>
            }
        }
        else {
            return <></>
        }
    }

    render() {

        var upvotes = 0;
        var downvotes = 0;
        this.state.votes.forEach(vote => {
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
                    <div className="idea-header">
                        {this.props.idea.isChosen ? (
                            <>
                                <p>{this.state.userName}</p>
                            </>
                        ) : (
                                <>
                                    <p>???</p>
                                </>
                            )}
                    </div>
                    <div className="idea-body">
                        <p className="idea-description">{this.props.idea.description}</p>
                    </div>
                    <div className="idea-footer">
                        <div className="mark-containers">
                            <div className="checkmark-container">
                                {this.state.currentPoster !== this.state.userLoggedIn && this.props.boardState === 2 ? (
                                    <button className="checkmark" onClick={this.voteUp}></button>
                                )
                                    : (
                                        <button className="checkmark disabled"></button>
                                    )}
                                <p className="checkmark-votes">{upvotes}</p>
                            </div>
                            <div className="xmark-container">
                                {this.state.currentPoster !== this.state.userLoggedIn && this.props.boardState === 2 ? (
                                    <button className="xmark" onClick={this.voteDown}></button>
                                )
                                    : (
                                        <button className="xmark disabled"></button>
                                    )}
                                <p className="xmark-votes">{downvotes}</p>
                            </div>
                        </div>
                        <div className="button-container">
                            {this.implementStateButtons()}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default BoardIdeaCard