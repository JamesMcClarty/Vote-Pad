import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import { Button } from 'reactstrap';

class HomeCard extends Component {

    state = {
        boardState: ""
    }

    componentDidMount() {
        APIManager.getOneDataExpandAnother("boards", this.props.board.id, "boardstate")
            .then(data => {
                this.setState({ boardState: data.boardstate.state })
            })
    }

    render() {
        return (
            <div className="home-card">
                <h4 className="card-subjectname">{this.props.board.subjectName}</h4>
                <div className="home-card-container">
                    <div className="home-card-content-left">
                        <p> Number of ideas: {this.props.board.ideas.length}</p>
                        <p> Status: {this.state.boardState}</p>
                        <p> Owner: {this.props.board.user.username}</p>
                    </div>
                    <div className="home-card-content-right">
                        <div className="home-date">
                            <p>Date Created: {this.props.board.dateCreated}</p>
                        </div>
                        <div className="home-button">
                            <Button type="button"
                                onClick={() => { this.props.history.push(`/boards/${this.props.board.id}/details`) }}>JOIN</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default HomeCard