import React, { Component } from 'react'
import Login from './components/auth/Login'
import Navbar from './components/nav/Navbar'
import AppView from './AppView'

class Votepad extends Component {

  state = {
    user: localStorage.getItem("credentials") !== null
  }
  isAuthenticated = () => localStorage.getItem("credentials") !== null

  clearUser = () => {
    localStorage.clear()

    this.setState({
      user: this.isAuthenticated()
    });

  }
  setUser = (authObj) => {
    localStorage.setItem(
      "credentials",
      JSON.stringify(authObj)
    )
    this.setState({
      user: this.isAuthenticated()
    });
  }

  componentDidMount() {
    this.setState({
      user: this.isAuthenticated()
    })
  }



  render() {
    return (
      <>
        <Navbar userLogged={this.state.user} />
        {this.state.user ? (
          <>
            <AppView setUser={this.setUser} user={this.state.user}/>
          </>
        ) : (
            <>
              <Login setUser={this.setUser} />
            </>
          )}
      </>
    )
  }
}

export default Votepad