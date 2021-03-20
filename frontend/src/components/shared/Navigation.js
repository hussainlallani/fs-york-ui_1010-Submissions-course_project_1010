import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap'
import { NavLink as RouteLink } from 'react-router-dom'
import parseJwt from '../../helpers/authHelper'
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const Navigation = () => {
    let history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const token = sessionStorage.getItem('token');
    const user = parseJwt(token).email;
    const logout = event => {
        event.preventDefault();
       sessionStorage.removeItem('token');
        history.push("/login");
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    return (
        <Navbar className="nav-color" expand="md" fixed="top">
            <Container>
            <NavbarBrand href="">LAXON ARTS</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={RouteLink} to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RouteLink} to="/about">About US</NavLink>
                    </NavItem>
                    <NavItem>
                       <NavLink tag={RouteLink} to="/contact">Contact Us</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RouteLink} to="/submissions">Submissions</NavLink>
                    </NavItem>
                    { `${user}`!=="undefined" && 
                    <NavItem>
                        <NavLink tag={RouteLink} to="/logout" > 
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                         <DropdownToggle caret>{user}</DropdownToggle>
                            <DropdownMenu className="text-center">
                                <button onClick={logout} className="btn">
                                <DropdownItem>Logout</DropdownItem>
                                </button>
                            </DropdownMenu>
                            </Dropdown>
                        </NavLink>
                    </NavItem>
                    }
                </Nav>
            </Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation