import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

class MyBoardCard extends Component {

    state = {
        ideas: [],
        status: ""
    }

    componentDidMount() {
        APIManager.getAllByCondition("ideas", "boardId", this.props.board.id)
            .then(data => {
                this.setState({ ideas: data })
                APIManager.getOne("boardstates", this.props.board.boardstateId)
                    .then(state => {
                        this.setState({ status: state.state })
                    })
            })
    }

    render() {
        return (<>
            <div className="myboardcard-container">
                <div className="myboardcard-left">
                    <h5>{this.props.board.subjectName}</h5>
                    <p>Number of ideas: {this.state.ideas.length}</p>
                    <p>Status: {this.state.status}</p>
                </div>
                <div className="myboardcard-right">
                    <p>Data Created:</p>
                    <p>{this.props.board.dateCreated}</p>
                    <button type="button"
                        onClick={() => { this.props.history.push(`/boards/${this.props.board.id}/details`) }}>JOIN</button>
                </div>
            </div>
        </>)
    }
}

export default MyBoardCard