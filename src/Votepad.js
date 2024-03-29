import React, { Component } from 'react'
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


  logout = () => {
    localStorage.removeItem("credentials")
    this.setState({ user: localStorage.getItem("credentials") !== null })
  }


  render() {
    return (
      <>
        <Navbar userLogged={this.state.user} logout={this.logout} />
        <AppView setUser={this.setUser} user={this.state.user} />
      </>


    )
  }
}

export default Votepad