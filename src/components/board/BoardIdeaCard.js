import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

class BoardIdeaCard extends Component {

    state = {
        votes: []
    }

    componentDidMount() {
        APIManager.getOneDataEmbedAnother("ideas", this.props.idea.id, "votes")
            .then(data => {
                this.setState({ votes: data.votes })
            })
    }

    implementStateButtons(){
        const buttonscript=<></>
        if(this.props.boardState === 1){

        }
        return buttonscript
    }

    render() {

        const upvotes = 0;
        const downvotes = 0;

   

        return (
            <>
                <div className="idea-card">
                    <div className="idea-header">
                        {this.props.idea.isChosen ? (
                            <>
                                <p>{this.props.idea.userName}</p>
                                <p>{this.props.idea.dataCreated}</p>
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
                        <div className="checkmark-container">
                            <button className="checkmark"></button>
                            <p className="checkmark-votes">{upvotes}</p>
                        </div>
                        <div className="xmark-container">
                            <img className="xmark" src={require('../../websiteresources/xmark.png')} />
                            <p className="xmark-votes">{downvotes}</p>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default BoardIdeaCard