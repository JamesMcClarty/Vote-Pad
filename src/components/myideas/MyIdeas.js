import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import MyIdeasCard from './MyIdeasCard'
//Alertify
import alertify from 'alertifyjs'
import '../../alertify.css'


class MyIdeas extends Component {

    state = {
        ideas:[],
        currentUserId: 0,
        searchText:""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        let returnedStorage = localStorage.getItem('credentials')
        let currentUser = JSON.parse(returnedStorage)
        APIManager.getAllByCondition("users", "email", currentUser.email)
        .then(data => {
            console.log(data[0].id);
            this.setState({currentUserId:data[0].id})
            APIManager.getAllByConditionAndEmbed("ideas","userId",this.state.currentUserId,"votes")
            .then(ideasData =>{
                this.setState({ideas:ideasData})
            })
        })
    }

    searchForIdeas = () => {
        APIManager.getAllByTwoConditionsAndEmbed("ideas","userId",this.state.currentUserId, "description_like", this.state.searchText ,"votes")
            .then(ideasData =>{
                this.setState({ideas:ideasData})
            })
    }

    render() {
        return (
            <>
                <article className="myideas-container">

                    <div className="searchbar-container">
                        <input className="searchbar" type="text" onChange={this.handleFieldChange} id="searchText" />
                        <button className="search-button" onClick={this.searchForIdeas}>Search</button>
                    </div>

                    <div className="myIdeasContainer">
                    {this.state.ideas.map(idea => <MyIdeasCard
                            key={"myIdea" + idea.id}
                            idea={idea}
                            {...this.props} />)}
                    </div>

                </article>
            </>
        )
    }
}

export default MyIdeas