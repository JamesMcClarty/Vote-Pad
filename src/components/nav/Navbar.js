import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import './Navbar.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class NavBar extends Component {
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
                                    <DropdownItem><Link className="nav-link" to="/myboards">My Boards</Link></DropdownItem>
                                    <DropdownItem><Link className="nav-link" to="/boardlist">Board List</Link></DropdownItem>
                                    <DropdownItem><Link className="nav-link" to="/myideas">My Ideas</Link></DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem><Link className="nav-link" onClick ={this.props.logout} to="/login">Logout</Link></DropdownItem>
                                </>
                            ) : (
                                    <>
                                        <DropdownItem><Link className="nav-link"  to="/login">Log In</Link></DropdownItem>
                                        <DropdownItem><Link className="nav-link"  to="/register">Register</Link></DropdownItem>
                                    </>
                                )}
                    </DropdownMenu>
                </Dropdown>
                    <img className="nav-logo" src={require('../../websiteresources/votepad.png')} />
                    
                    <div>
                        {this.props.userLogged ? (
                            <div>
                                <Link className="nav-link" onClick ={this.props.logout} to="/login">Logout</Link>
                            </div>
                        ) : (
                                <div>
                                    <Link className="nav-link" to="/login">Log In</Link>
                                    <Link className="nav-link" to="/register">Register</Link>
                                </div>
                            )}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(NavBar)