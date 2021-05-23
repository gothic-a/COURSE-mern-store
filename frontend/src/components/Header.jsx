import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'

const Header = () => {

    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.userLogin)
    const name = userInfo && userInfo.name

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className="header pb-3">
            <Navbar bg="dark" variant="dark" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="/">ProShop</Navbar.Brand>
                    </LinkContainer>
                    
                    <Nav className="mr-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                        </LinkContainer>
                        
                        {
                            name ? (
                                <NavDropdown title={name} id='username' >
                                    <LinkContainer to="/profile" >
                                        <NavDropdown.Item className="py-2">Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}  className="py-2">
                                        Logout <i style={{fontSize: '1.1em'}} className="fas fa-sign-out-alt"></i>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : 
                            (
                                <LinkContainer to="/login">
                                    <Nav.Link> <i className="fas fa-user"></i> Sign in</Nav.Link>
                                </LinkContainer>
                            )
                        }
                        
                    </Nav>
                </Container> 
            </Navbar>
        </div>
    )
}

export default Header