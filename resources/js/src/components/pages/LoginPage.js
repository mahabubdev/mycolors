import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "../css/auth.css";

import { login } from "../../store/actions/auth";


const LoginPage = (props) =>  {

    // Local State for form data
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    // de-structure
    const { username, password } = user;

    // on change handle
    const onchangeData = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onsubmitForm = (e) => {
        e.preventDefault();
        // pass user now
        //login(user);
        console.log(props);
    }




    return (
        <div className="auth-page">
            <h2>Login</h2>
            <hr />
            <form className="form" onSubmit={onsubmitForm}>
                <input name="username" placeholder="Username" onChange={onchangeData}  /> <br />
                <input name="password" placeholder="Password" onChange={onchangeData}  /> <br />
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