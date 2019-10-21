import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

class BoardIdeaCard extends Component {

    state = {
        votes: []
    }

    componentDidMount() {

    }

    render() {
        console.log(this.props.idea)
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

                        </div>
                        <div className="idea-footer">

                        </div>
                    </div>
            </>
                )
            }
        }
        
export default BoardIdeaCard