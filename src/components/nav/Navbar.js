import React, { Component, useState } from 'react'
import { Link, withRouter } from "react-router-dom"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './Navbar.css'


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
                    <div className="navbar-div">
                        <Navbar color="faded" light>
                            <NavbarToggler onClick={this.toggle} className="mr-2" />
                            <Collapse isOpen={this.state.dropdownOpen} navbar>
                                <Nav navbar>
                                {this.props.userLogged ? (
                                <>
                                    <NavItem>
                                    <Link className="nav-link" to="/myboards">My Boards</Link>
                                    </NavItem>
                                    <NavItem>
                                    <Link className="nav-link" to="/boardlist">Board List</Link>
                                    </NavItem>
                                    <NavItem>
                                    <Link className="nav-link" to="/myideas">My Ideas</Link>
                                    </NavItem>
                                    <NavItem> 
                                    <Link className="nav-link" onClick ={this.props.logout} to="/login">Logout</Link>
                                    </NavItem>
                                    </>
                                     ) : (
                                        <>
                                            <NavItem><Link className="nav-link"  to="/login">Log In</Link></NavItem>
                                            <NavItem><Link className="nav-link"  to="/register">Register</Link></NavItem>
                                        </>
                                    )}
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                    <div>
                        <img className="nav-logo" src={require('../../websiteresources/votepad.png')} />
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(NavBar)