import React, {Component} from 'react'
import reactDOM from 'react-dom'
import Login from './components/auth/Login'
import Navbar from './components/nav/Navbar'
import AppView from './AppView'

class Votepad extends Component{

    state={
        user:false
    }

    render(){
        return(
            <>
                {this.state.user ?(
                    <>
                    <Navbar/>
                    <AppView/>
                    </>
                ):(
                    <>
                    <Login/>
                    </>
                )}
            </>
        )
    }
}

export default Votepad