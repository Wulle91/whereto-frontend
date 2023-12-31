import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/where_logo.png";
import styles from "../styles/NotFound.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';



const NavBar = () => {
  const currentUser = useCurrentUser();

  const addPostIcon = (
    <NavLink 
      className={styles.NavLink} 
      activeClassName={styles.Active} 
      to="/posts/create">
        <i className='fas fa-plus-square'></i>
          <span className={styles.Hide}>Add post</span>
    </NavLink>
  )
  const loggedInIcons = (<>
    <NavLink 
      className={styles.NavLink} 
      activeClassName={styles.Active} 
      to="/followed">
        <i className="fas fa-list"></i>
          <span className={styles.Hide}>Bucket</span>
    </NavLink>
    {addPostIcon}
    <NavLink 
      className={styles.NavLink} 
      activeClassName={styles.Active} 
      to="/locations">
        <i className="fas fa-search-location"></i>
          <span className={styles.Hide}>Whereto</span>
    </NavLink>
    <NavLink 
      className={styles.NavLink} 
      activeClassName={styles.Active} 
      to={`/profiles/${currentUser?.profile_id}`}>
        <Avatar 
          src={currentUser?.profile_image} 
          height={40}/>
            <span className={styles.Hide}>Profile</span>
    </NavLink>
  </>)
  const loggedOutIcons = (<>
    <NavLink 
      className={styles.NavLink} 
      activeClassName={styles.Active} 
      to="/signin">
        <i className='fas fa-sign-in-alt'></i>
        <span className={styles.Hide}>Sign in</span>
    </NavLink>
    <NavLink 
      className={styles.NavLink} 
      activeClassName={styles.Active} 
      to="/signup">
        <i className='fas fa-user-plus'></i>
          <span className={styles.Hide}>Sign up</span>
    </NavLink>
  </>)

  return (
    <Navbar className={styles.NavBar} bg="light" variant="light">
        <Container className={styles.Space}>
            <NavLink to="/">
                <Navbar.Brand><img src={logo} alt='logo' height="45"/></Navbar.Brand>
            </NavLink>
            <Nav className={`me-auto ${styles.Space}`}>
                <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/"><i className='fas fa-home'></i><span className={styles.Hide}>Home</span></NavLink>
                {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar