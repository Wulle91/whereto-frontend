import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/where_logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} bg="light" variant="light">
        <Container>
            <NavLink to="/">
                <Navbar.Brand><img src={logo} alt='logo' height="45"/></Navbar.Brand>
            </NavLink>
            <Nav className="me-auto">
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/"><i className='fas fa-home'></i>Home</NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin"><i className='fas fa-sign-in-alt'></i>Sign in</NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup"><i className='fas fa-user-plus'></i>Sign up</NavLink>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar