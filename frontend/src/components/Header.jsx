import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap'

const Header = () => {
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
                        
                        <LinkContainer to="/login">
                            <Nav.Link> <i className="fas fa-user"></i> Sign In</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container> 
            </Navbar>
        </div>
    )
}

export default Header