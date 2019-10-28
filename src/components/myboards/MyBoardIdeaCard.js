import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

class MyBoardIdeaCard extends Component {

    state = {
        ideas:[]
    }

    componentDidMount() {
        APIManager.getAllByCondition("ideas", "boardId", this.props.boardId)
        .then(idealist => {
            this.setState({ideas:idealist})
        })
    }

    render() {

        const number = this.state.ideas.length
        let idea = ""

        if(number === 0){
            idea = "None so far..."
        }
        else{
            idea = this.state.ideas[number-1].description
        }

        return(<>
            <div className = "latestidea-container">
                <h5>Latest Idea:</h5>
                <p className = "latestidea">{idea}</p>
            </div>
        </>)
    }
}

export default MyBoardIdeaCard