import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { logout } from '../actions/userActions';

function Header() {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <header>
    <Navbar expand="lg" variant='dark' bg="dark" className="bg-body-tertiary" collapseOnSelect>
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>WHO OWNS</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          > 
          {userInfo ? (
            <NavDropdown title={`${userInfo.name}`} id="navbarScrollingDropdown">
              <LinkContainer to="/"><NavDropdown.Item>Home</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/profile"><NavDropdown.Item>Account</NavDropdown.Item></LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
            ) : (
            <>
            <LinkContainer to="/login"><Nav.Link><i className="fa-solid fa-user"></i> Login</Nav.Link></LinkContainer>
            </>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Admin" id="adminDropdown">
              <LinkContainer to="/admin/userList"><NavDropdown.Item>View Users</NavDropdown.Item></LinkContainer>
            </NavDropdown>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  );
}

export default Header
