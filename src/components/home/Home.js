import React, { Component } from 'react'
import HomeCard from './HomeCard';
import APIManager from '../../modules/APIManager'
import './Home.css'


class Home extends Component {

    state = {
        boards: [],
    };


    componentDidMount() {
        APIManager.getAllDataExpandAnother("boards", "user")
            .then((data) =>
                this.setState({ boards: data })
            )
    }

    render() {


        return (
            <>
                <article className="home-container">
                    <div className="home-image">
                    <img className="main-logo" src={require('../../websiteresources/votepad.png')} />
                    </div>
                    <h1 className = "home-popular">Most popular boards</h1>
                    <div className="home-boardlist">
                        {this.state.boards.map(board =>
                            <HomeCard key={board.id} board={board} {...this.props} />
                        )}
                    </div>
                </article>
            </>
        )
    }
}

export default Home