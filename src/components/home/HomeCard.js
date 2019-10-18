import React, { Component } from 'react';
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager"

class HomeCard extends Component {

    state = {
        numberOfIdeas: 0,
        boardState: ""
    }

    componentDidMount() {
        APIManager.getOneDataEmbedAnother("boards", this.props.board.id, "ideas")
            .then(data => {
                this.setState({ numberOfIdeas: data.ideas.length })
                console.log(data)
                APIManager.getOneDataExpandAnother("boards", this.props.board.id, "boardstate")
                    .then(data => {
                        console.log(data)
                        this.setState({ boardState: data.boardstate.state })
                    })
            })
    }

    render() {
        return (
            <div className="home-card">
                <h4 className="card-subjectname">{this.props.board.subjectName}</h4>
                <div className="home-card-container">
                    <div className="home-card-content-left">
                        <p> Number of ideas: {this.state.numberOfIdeas}</p>
                        <p> Status: {this.state.boardState}</p>
                        <p> Owner: {this.props.board.user.username}</p>
                    </div>
                    <div className="home-card-content-right">
                        <div>
                            <p>Date Created: {this.props.board.dateCreated}</p>
                        </div>
                        <button type="button"
                            onClick={() => { this.props.history.push(`/home`) }}>JOIN</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default HomeCard