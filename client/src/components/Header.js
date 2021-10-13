import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        className='navbar'
        bg='light'
        variant='danger'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand >  <p style={{ color:'white', fontSize:'25px',fontFamily:'revert'}}>Green Life </p></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                 <div style={{ color:'white',fontSize:'15px'} }><i  className='fas fa-shopping-cart'></i>Cart{''} </div> 
                  {cartItems.length > 0 && (
                    <span className='badge'>{cartItems.length}</span>
                  )}
                </Nav.Link>
              </LinkContainer> 
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                   <div style={{color:'white',fontSize:'15px'}}><i className='fas fa-user'></i> Sign In</div> 
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                  <NavDropdown  title='Admin' id='adminmenu'>
                  <LinkContainer  to='/admin/userlist'>
                    <NavDropdown.Item >Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer  to='/admin/productlist'>
                  <NavDropdown.Item >  Products </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer  to='/admin/orderlist'>
                  <NavDropdown.Item >  Orders </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
