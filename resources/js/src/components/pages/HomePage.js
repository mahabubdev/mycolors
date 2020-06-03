import React from 'react';
import { NavLink } from 'react-router-dom';

import "../css/home.css";

const HomePage = (props) =>  {
    return (
        <div className="hero">
            <section className="container">
                <div className="overlay"></div>
                <div className="hero-content">
                    <div className="content-wrapper">
                        <h2>myColors</h2>
                        <h5>Developer's personal studio</h5>
                        <NavLink to="/register" className="btn btn-h mt-3">join now</NavLink>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;