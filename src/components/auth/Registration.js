import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import alertify from 'alertifyjs'
import '../../alertify.css'
import './auth.css'

class Registration extends Component {

    // Set initial state
    state = {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleRegister = (e) => {
        e.preventDefault()
            if(this.state.password === this.state.repeatPassword){
                const newUser ={
                    name: this.state.name,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                }
                APIManager.post("users", newUser)
                .then((data)=>{
                let credentials = {email: newUser.email, password: newUser.password}
                this.props.setUser(credentials);
                this.props.history.push("/");
                })
            }
            else{
                alertify.warning("Please make sure the passwords match.")
            }
        }
    

    render() {
        return (
            <>
                <h3 className="h3Login">Register</h3>
                <form onSubmit={this.handleRegister}>
                    <fieldset>
                        <div className="login-formgrid">
                            <div className="input-field">
                                <label>Name</label>
                                <input onChange={this.handleFieldChange} type="text"
                                    id="name"
                                    placeholder="Name"
                                    required autoFocus="" />
                            </div>
                            <div className="input-field">
                                <label>Username</label>
                                <input onChange={this.handleFieldChange} type="text"
                                    id="username"
                                    placeholder="Username"
                                    required autoFocus="" />
                            </div>
                            <div className="input-field">
                                <label>Email address</label>
                                <input onChange={this.handleFieldChange} type="email"
                                    id="email"
                                    placeholder="Email address"
                                    required autoFocus="" />
                            </div>
                            <div className="input-field">
                                <label>Password</label>
                                <input onChange={this.handleFieldChange} type="password"
                                    id="password"
                                    placeholder="Password"
                                    required autoFocus="" />
                            </div>
                            <div className="input-field">
                                <label>Repeat Password</label>
                                <input onChange={this.handleFieldChange} type="password"
                                    id="repeatPassword"
                                    placeholder="Please Repeat Password"
                                    required autoFocus="" />
                            </div>
                            <button type="submit" className="login-button" disabled = {this.state.submitButtonDisabled}>
                                Sign in
                    </button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default Registration