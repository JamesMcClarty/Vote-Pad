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
        currentUserId: 0,
        userLoggedIn: "",
        userName: "",
        votedOn: 0,
        votedId: 0
    }

    componentDidMount() {
        let returnedStorage = localStorage.getItem('credentials')
        let currentUser = JSON.parse(returnedStorage)
        this.setState({ userLoggedIn: currentUser.email })
        APIManager.getAllByCondition("users", "email", currentUser.email)
            .then(users => {
                this.setState({ currentUserId: users[0].id })
                APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
                    .then(data => {
                        this.setState({ votes: data.votes })
                        this.state.votes.forEach(vote => {
                            console.log(vote.userId, this.state.currentUserId, vote)
                            if (vote.userId === this.state.currentUserId) {
                                this.setState({ votedOn: vote.typeId, votedId: vote.id })
                            }
                        })
                        APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                            .then(data => {
                                this.setState({ currentPoster: data.user.email, userName: data.user.username })
                            })
                    })
            })
    }

    acceptIdea = () => {
        alertify.confirm("Are you sure? This cannot be undone!", this.confirmAccept,
            function () {

            });
    }

    confirmAccept = () => {
        const editedObject = {
            id: this.props.idea.id,
            userId: this.props.idea.userId,
            boardId: this.props.idea.boardId,
            description: this.props.idea.description,
            "isChosen": true
        }
        APIManager.update("ideas", editedObject)
            .then(() => {
                this.props.reload();
            })
    }

    voteUp = () => {
        if (this.state.votedOn === 1) {
            APIManager.delete("votes", this.state.votedId).then(() => {
                APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
                    .then(data => {
                        if (Object.keys(data.votes).length !== 0) {
                            this.setState({ votes: data.votes })
                            this.state.votes.forEach(vote => {
                                console.log(vote.userId, this.state.currentUserId, vote)
                                if (vote.userId === this.state.currentUserId) {
                                    this.setState({ votedOn: vote.typeId, votedId: vote.id })
                                }
                                else{
                                    this.setState({ votedOn: 0, votedId: vote.id })
                                }
                            })
                        }
                        else {
                            this.setState({ votes: data.votes, votedOn: 0, votedId: 0 })
                        }
                        APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                            .then(data => {
                                this.setState({ currentPoster: data.user.email, userName: data.user.username })
                            })
                    })
            })
        }

        else if (this.state.votedOn === 2) {
            const editedObject = {
                id: this.state.votedId,
                ideaId: this.props.idea.id,
                userId: this.state.currentUserId,
                typeId: 1
            }
            APIManager.update("votes", editedObject).then(() => {
                APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
                    .then(data => {
                        this.setState({ votes: data.votes })
                        this.state.votes.forEach(vote => {
                            console.log(vote.userId, this.state.currentUserId, vote)
                            if (vote.userId === this.state.currentUserId) {
                                this.setState({ votedOn: vote.typeId, votedId: vote.id })
                            }
                        })
                        APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                            .then(data => {
                                this.setState({ currentPoster: data.user.email, userName: data.user.username })
                            })
                    })
            })
        }

        else {
            const newObject = {
                ideaId: this.props.idea.id,
                userId: this.state.currentUserId,
                typeId: 1
            }
            APIManager.post("votes", newObject)
                .then(() => {
                    APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
                        .then(data => {
                            this.setState({ votes: data.votes })
                            this.state.votes.forEach(vote => {
                                console.log(vote.userId, this.state.currentUserId, vote)
                                if (vote.userId === this.state.currentUserId) {
                                    this.setState({ votedOn: vote.typeId, votedId: vote.id })
                                }
                            })
                            APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                                .then(data => {
                                    this.setState({ currentPoster: data.user.email, userName: data.user.username })
                                })
                        })
                })
        }
    }

    voteDown = () => {
        if (this.state.votedOn === 2) {
            APIManager.delete("votes", this.state.votedId)
                .then(t => {
                    APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
                        .then(data => {
                            console.log(Object.keys(data.votes).length)
                            if (Object.keys(data.votes).length !== 0) {
                                this.setState({ votes: data.votes })
                                this.state.votes.forEach(vote => {
                                    console.log(vote.userId, this.state.currentUserId, vote)
                                    if (vote.userId === this.state.currentUserId) {
                                        this.setState({ votedOn: vote.typeId, votedId: vote.id })
                                    }else{
                                        this.setState({ votedOn: 0, votedId: vote.id })
                                    }
                                })
                            }
                            else {
                                this.setState({ votes: data.votes, votedOn: 0, votedId: 0 })
                            }
                            APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                                .then(data => {
                                    this.setState({ currentPoster: data.user.email, userName: data.user.username })
                                })
                        })
                })
        }

        else if (this.state.votedOn === 1) {
            const editedObject = {
                id: this.state.votedId,
                ideaId: this.props.idea.id,
                userId: this.state.currentUserId,
                typeId: 2
            }
            APIManager.update("votes", editedObject).then(() => {
                APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
                    .then(data => {
                        this.setState({ votes: data.votes })
                        this.state.votes.forEach(vote => {
                            console.log(vote.userId, this.state.currentUserId, vote)
                            if (vote.userId === this.state.currentUserId) {
                                this.setState({ votedOn: vote.typeId, votedId: vote.id })
                            }
                        })
                        APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                            .then(data => {
                                this.setState({ currentPoster: data.user.email, userName: data.user.username })
                            })
                    })
            })
        }

        else {
            const newObject = {
                ideaId: this.props.idea.id,
                userId: this.state.currentUserId,
                typeId: 2
            }
            APIManager.post("votes", newObject)
                .then(() => {
                    APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
                        .then(data => {
                            this.setState({ votes: data.votes })
                            this.state.votes.forEach(vote => {
                                console.log(vote.userId, this.state.currentUserId, vote)
                                if (vote.userId === this.state.currentUserId) {
                                    console.log(vote.typeId, vote.id)
                                    this.setState({ votedOn: vote.typeId, votedId: vote.id })
                                }
                            })
                            APIManager.getOneDataExpandAnother("ideas", this.props.idea.id, "user")
                                .then(data => {
                                    this.setState({ currentPoster: data.user.email, userName: data.user.username })
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
                                    <button className={"checkmark-"+this.state.votedOn} onClick={this.voteUp}></button>
                                )
                                    : (
                                        <button className="checkmark-0 disabled" disabled={true}></button>
                                    )}
                                <p className="checkmark-votes">{upvotes}</p>
                            </div>
                            <div className="xmark-container">
                                {this.state.currentPoster !== this.state.userLoggedIn && this.props.boardState === 2 ? (
                                    <button className={"xmark-"+this.state.votedOn} onClick={this.voteDown}></button>
                                )
                                    : (
                                        <button className="xmark-0 disabled" disabled={true}></button>
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