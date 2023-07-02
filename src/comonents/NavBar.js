import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/where_logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';



const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/');
      setCurrentUser(null);
    } catch (err) {
      console.log(err)
    }
  };

  const addPostIcon = (
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create"><i className='fas fa-plus-square'></i>Add post</NavLink>
  )
  const loggedInIcons = (<>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/followed"><i class="fas fa-list"></i>Bucket</NavLink>
    {addPostIcon}
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/whereto"><i class="fas fa-search-location"></i>Whereto</NavLink>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to={`/profiles/${currentUser?.profile_id}`}><Avatar src={currentUser?.profile_image} text="Profile" height={40}/></NavLink>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/" onClick={handleSignOut}><i class="fas fa-search-location"></i>SignOut</NavLink>
  </>)
  const loggedOutIcons = (<>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin"><i className='fas fa-sign-in-alt'></i>Sign in</NavLink>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup"><i className='fas fa-user-plus'></i>Sign up</NavLink>
  </>)

  return (
    <Navbar className={styles.NavBar} bg="light" variant="light">
        <Container>
            <NavLink to="/">
                <Navbar.Brand><img src={logo} alt='logo' height="45"/></Navbar.Brand>
            </NavLink>
            <Nav className="me-auto">
                <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/"><i className='fas fa-home'></i>Home</NavLink>
                {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar