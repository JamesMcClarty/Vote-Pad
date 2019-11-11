import React, { Component } from 'react'
import HomeCard from './HomeCard';
import APIManager from '../../modules/APIManager'
import './Home.css'


class Home extends Component {

    state = {
        boards: [],
    };


    componentDidMount() {
        APIManager.getallEmbedandExpand("boards","ideas","user")
            .then((data) =>
                this.setState({ boards: data })
            )
    }

    render() {

        const arrangedData = this.state.boards.sort((a,b) => (a.ideas.length < b.ideas.length) ? 1 : ((b.ideas.length < a.ideas.length) ? -1 : 0)); 

        return (
            <>
                <article className="home-container">
                    <div className="home-image">
                    <img className="main-logo" src={require('../../websiteresources/votepad.png')} alt = "VotePad"/>
                    </div>
                    <h1 className = "home-popular">Most popular boards</h1>
                    <div className="home-boardlist">
                        {arrangedData.map(board =>
                            <HomeCard key={board.id} board={board} {...this.props} />
                        )}
                    </div>
                </article>
            </>
        )
    }
}

export default Home