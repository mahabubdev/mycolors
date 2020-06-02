import React from "react";
import "../css/about.css";


import { GoCode } from "react-icons/go"


function AboutPage ( props ) {
    // 
    return (
        <div className="page_area about">
            <div className="hero-others">
                <div className="overlay"></div>
                <div className="hero-content">
                    <h2 className="text-center">About Me</h2>
                </div>
            </div>
            <div className="container">

                <div className="row w-100 mt-5 py-5 d-flex flex-coulmn justify-content-between abt-p">
                    <h3 className="text-center text-uppercase text-bold">About this project</h3>
                    <p className="text-bold pl-5">
                        This is my first Full-stack web app that I have build on my own hand-coded and used <span className="text-danger">Laravel 7.x and React (16.8+)</span> together. 
                        In the frontend part, I have used Redux ( + Redux-thunk, + Redux-promise) for state managment and React latest Hooks with also React-Redux Hooks.
                        Also used 'secure-ls' package for secure the LocalStorage data.
                        Now few informations about backend part, Laravel 7.x PHP based MVC framework.
                        For SPA Authentication (Single Page Application) I have used Laravel's latest 'snactum'. Similar like laravel-passport JWT. Database (MySQL 5.7) was handled by Laravel-Eloquent ORM. <br />
                        This is made for my portfolio and Fancy colors managment :)

                    </p>
                </div>


                <section className="abt-head mt-5 py-2">
                    <h3 className="text-bold my-4"> # Few words about me #</h3>
                    <div className="row py-3">
                        <div className="col-md-4">
                            <div className="abt-cards">
                                <h4 className="text-center text-capitalize">Backend developer</h4>
                                <hr />
                                <h5><GoCode /> PHP and Node.Js</h5>
                                <h5><GoCode /> PHP-OOP, WordPress</h5>
                                <h5><GoCode /> ES6, Express.Js</h5>
                                <h5><GoCode /> RESTfull APIs development</h5>
                                <h5><GoCode /> MySQL, PostgreSQL, MongoDB</h5>
                                <h5><GoCode /> WebSockets, Redis and so on</h5>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="abt-cards">
                                <h4 className="text-center text-capitalize">Frontend developer</h4>
                                <hr />
                                <h5><GoCode /> JavaScripts (ES6+), HTML5, CSS3</h5>
                                <h5><GoCode /> Bootstrap (4.x), Tailwind</h5>
                                <h5><GoCode /> Node.Js, NPM and Webpack</h5>
                                <h5><GoCode /> React (16.8.x+), Vue JS</h5>
                                <h5><GoCode /> Redux, Vuex, Context API</h5>
                                <h5><GoCode /> Sass(scss), UI/UX and more... </h5>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="abt-cards">
                                <h4 className="text-center text-capitalize">Full-stack developer</h4>
                                <hr />
                                <h5><GoCode /> Laravel MVC framework</h5>
                                <h5><GoCode /> MERN stack solutions</h5>
                                <h5><GoCode /> LAMP stack solutions</h5>
                                <h5><GoCode /> Laravel + React/Vue</h5>
                                <h5><GoCode /> WordPress Theme/plugins dev.</h5>
                                <h5><GoCode /> Deploy in Cloud / Web-Hosting</h5>
                            </div>
                        </div>
                    </div>
                </section> { /* Section ended here */ }
                
            </div>
        </div>
    );
}

export default AboutPage;