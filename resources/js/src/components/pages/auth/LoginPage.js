import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import "../../css/auth.css";

import { loginReq } from '../../../store/actions/auth'


const LoginPage = (props) =>  {

    // initiate dispatch
    const dispatch = useDispatch();

    const auth = useSelector( state => (state.auth) ); // Auth State

    // Login Form handling
    const [loginData , setLoginData] = useState({ username: '', password: '' });

    const { username, password } = loginData; // de-structured

    // handle onchange
    const inputHandleChange = e => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    }

    // handle form submit
    const formSubmit = e => {
        e.preventDefault();
        console.log(loginData);
        //loginReq(loginData); // send to loginReq action
        dispatch(loginReq(loginData));
        //useCallback( dispatch(loginReq(loginData), [dispatch]) );
    }



    return (
        <div className="auth-page">
            <h2>Login</h2>
            <hr />
            <form className="form" onSubmit={formSubmit}>
                <p>Current Status: { auth.isAuthenticated ? "TRUE" : "FALSE" }</p>
                <input name="username" placeholder="Username" onChange={inputHandleChange}  /> <br />
                <input name="password" placeholder="Password" onChange={inputHandleChange}  /> <br />
                <button className="btn" type="submit">Login</button>
                <hr />
                <p>
                    Need an account ? <NavLink to="/register">Create an account</NavLink>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;