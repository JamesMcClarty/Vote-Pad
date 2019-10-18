import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import HomeCard from './HomeCard';
import APIManager from '../../modules/APIManager'
import './Home.css'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards:[]
        };
    }

    componentDidMount(){
        APIManager.getAllDataExpandAnother("boards","user")
        .then((data)=>
            this.setState({boards:data})
        )
    }

    render() {

        
        return (
            <>
                <article className="home-container">
                    <div className="home-image">
                        <p> You're on home page!</p>
                    </div>
                    <div className="home-boardlist">
                    {this.state.boards.map(board =>
                            <HomeCard key={board.id} board={board} {...this.props}/>
                        )}
                    </div>
                </article>
            </>
        )
    }
}

export default Home