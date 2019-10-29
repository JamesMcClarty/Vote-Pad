import React, { Component } from "react"
import { withRouter } from "react-router";
import APIManager from "../../modules/APIManager";
import alertify from 'alertifyjs'

class Login extends Component {

  // Set initial state
  state = {
    email: "",
    password: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleLogin = (e) => {
    e.preventDefault()
    APIManager.getAllByTwoConditions("users", "email", this.state.email, "password", this.state.password)
    .then(data => {
      console.log(Object.keys(data).length)
      if(Object.keys(data).length >= 1){
        let credentials = {email: this.state.email, password: this.state.password}
        this.props.setUser(credentials);
        this.props.history.push("/");
      }
      else{
        alertify.warning("User does not exist. Please try again or register.")
      }
    })
  }

  render() {
    return (
        <fieldset>
            <h3>Please sign in</h3>
            <div className="formgrid">
                <input onChange={this.handleFieldChange} type="email"
                    id="email"
                    placeholder="Email address"
                    required="" autoFocus="" />
                <label htmlFor="inputEmail">Email address</label>

                <input onChange={this.handleFieldChange} type="password"
                    id="password"
                    placeholder="Password"
                    required="" />
                <label htmlFor="inputPassword">Password</label>
            </div>
            <button onClick  = {this.handleLogin}>
                Sign in
            </button>
        </fieldset>
    )
  }

}

export default withRouter(Login)