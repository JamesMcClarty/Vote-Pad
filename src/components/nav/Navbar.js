import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Navbar.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    //<Link className="nav-link" to="/animals">Animals</Link>

    render() {
        return (
            <div className="nav-container">
                <div className="nav-dropdown">

                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Dropdown
              </DropdownToggle>
                        <DropdownMenu>
                            {this.props.userLogged ? (
                                <>
                                    <DropdownItem>My Boards</DropdownItem>
                                    <DropdownItem>Board List</DropdownItem>
                                    <DropdownItem>My Ideas</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Log Out</DropdownItem>
                                </>
                            ) : (
                                    <>
                                        <DropdownItem>Log in</DropdownItem>
                                        <DropdownItem>Register</DropdownItem>
                                    </>
                                )}

                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div>
                    <p>VOTEPAD</p>
                </div>

                <div>
                    {this.props.userLogged ? (
                        <>
                            <p>Log Out</p>
                        </>
                    ) : (
                            <>
                                <p>Log in</p>
                                <p>Register</p>
                            </>
                        )}

                </div>


            </div>
        );
    }
}