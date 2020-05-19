import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import "../../css/auth.css";

import { registerReq } from '../../../store/actions/auth'



const RegisterPage = (props) =>  {

    // initiate dispatch
    const dispatch = useDispatch();

    const auth = useSelector( state => (state.auth) ); // Auth State

    // Login Form handling
    const [RegData , setRegData] = useState({ 
        name: '',
        username: '', 
        email: '',
        password: '',
        password_confirmation: ''
    });

    const { name, username, email, password, password_confirmation } = RegData; // de-structured

    // handle onchange
    const inputHandleChange = e => {
        setRegData({
            ...RegData,
            [e.target.name]: e.target.value
        });
    }

    // handle form submit
    const formSubmit = e => {
        //check passwords
        e.preventDefault();

        if (RegData.password != RegData.password_confirmation) {
            alert('Passwords mismatched');
        } else {
            // go to create
            console.log(RegData);
            //registerReq(RegData); // send to registerReq action
            dispatch(registerReq(RegData));
        }

    }




    return (
        <div className="auth-page">
            <h2>Register</h2>
            <hr />
            <form className="form" onSubmit={formSubmit}>
                <p>Current Status: { auth.isAuthenticated ? "TRUE" : "FALSE" }</p>
                <input required type="text" name="name" placeholder="Full Name" onChange={inputHandleChange}  /> <br />
                <input required type="text" name="username" placeholder="Username" onChange={inputHandleChange}  /> <br />
                <input required type="email" name="email" placeholder="Email Address" onChange={inputHandleChange}  /> <br />
                <input required type="password" name="password" placeholder="Password" onChange={inputHandleChange}  /> <br />
                <input required type="password" name="password_confirmation" placeholder="Confirm Password" onChange={inputHandleChange}  /> <br />
                <button className="btn" type="submit">Register</button>
                <hr />
                <p>
                    Already have an account ? <NavLink to="/login">Login now</NavLink>
                </p>
            </form>
        </div>
    );
}

export default RegisterPage;