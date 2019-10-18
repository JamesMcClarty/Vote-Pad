import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectName:"",
            userName:"",
            ideas:[],
        };
    }

    componentDidMount(){

    }

    render() {        
        return (
            <p>f</p>
        )
    }
}

export default Board