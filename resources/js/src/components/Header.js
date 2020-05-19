import React from 'react';
import '../components/css/header.css'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { logOut } from '../store/actions/auth'

const Header = (props) => {

    const dispatch = useDispatch()

    // controls by dynamic
    const auth = useSelector( state => (state.auth) ); // Auth State

    const logMeOut = () => {
        dispatch(logOut())
    }   


    return(
        <div className="header-area">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">MyColors</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex justify-content-end justify-align-center w-100">
                            <li className="nav-item active">
                                <NavLink className="nav-link" activeClassName="text-danger" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="text-danger" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="text-danger" to="/contact">Contact</NavLink>
                            </li>
                            {
                                auth.isAuthenticated ? (
                                    <React.Fragment>
                                        <li className="nav-item">
                                            <NavLink className="nav-link btn btn-outline-info" activeClassName="btn-info" to="/dashboard">Dashboard</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <button onClick={logMeOut} className="nav-link btn btn-outline-danger ml-2">Logout</button>
                                        </li>
                                    </React.Fragment> 
                                ) : (
                                    <React.Fragment>
                                        <li className="nav-item">
                                            <NavLink className="nav-link btn btn-outline-success" activeClassName="btn-success" to="/login">Login</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link btn btn-outline-primary ml-2" activeClassName="btn-primary" to="/register">Register</NavLink>
                                        </li>
                                    </React.Fragment>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;