import React, { Component } from "react"
import { withRouter } from "react-router";
import APIManager from "../../modules/APIManager";
import {Button} from 'reactstrap';
import alertify from 'alertifyjs'
import '../../alertify.css'
import './auth.css'

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
        if (Object.keys(data).length >= 1) {
          let credentials = { email: this.state.email, password: this.state.password }
          this.props.setUser(credentials);
          this.props.history.push("/");
        }
        else {
          alertify.warning("User does not exist. Please try again or register.")
        }
      })
  }

  render() {
    return (
      <fieldset className = "authFieldSet">
        <h3 className = "h3Login">Please sign in</h3>
        <div className="login-formgrid">
          <div className="input-field">
            <label className = "authLabel">Email address</label>
            <input onChange={this.handleFieldChange} type="email"
              id="email"
              placeholder="Email address"
              required="" autoFocus="" />
          </div>
          <div className="input-field">
            <label className = "authLabel">Password</label>
            <input onChange={this.handleFieldChange} type="password"
              id="password"
              placeholder="Password"
              required="" />
          </div>
          <Button className="login-button" onClick={this.handleLogin}>
          Sign in
            </Button>
        </div>
      </fieldset>
    )
  }

}

export default withRouter(Login)