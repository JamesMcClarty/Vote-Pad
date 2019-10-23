import React, { Component } from 'react'
import './Navbar.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Home extends Component {
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
            <>
                <div className="nav-container">
                <Dropdown group isOpen={this.state.dropdownOpen} size="lg" toggle={this.toggle}>
                    <DropdownToggle caret>
                        
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem></DropdownItem>
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
            </>
        );
    }
}

export default Home