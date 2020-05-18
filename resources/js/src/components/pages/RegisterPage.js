import React from 'react';
import {NavLink} from 'react-router-dom'
import "../css/auth.css";

const RegisterPage = (props) =>  {

    return (
        <div className="auth-page">
            <h2>Registration</h2>
            <hr />
            <form className="form">
                <input name="name" placeholder="Full Name"  /> <br />
                <input name="email" placeholder="Email Address"  /> <br />
                <input name="username" placeholder="Username"  /> <br />
                <input name="password" placeholder="Password"  /> <br />
                <input name="c_password" placeholder="Confirm Password"  /> <br />
                <button className="btn" type="submit">Sign up</button>
                <hr />
                <p>
                    Already have an account ? <NavLink to="/login">Login Now</NavLink>
                </p>
            </form>
        </div>
    );
}

export default RegisterPage;