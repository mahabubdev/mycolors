import React from "react";
import "../css/contact.css";
import { IoLogoFacebook, IoLogoInstagram, IoMdMail, IoLogoGithub } from 'react-icons/io'


function ContactPage ( props ) {
    // 
    return (
        
        <div className="page_area contact">
            <div className="hero-others">
                <div className="overlay"></div>
                <div className="hero-content">
                    <h2 className="text-center">Contact Me</h2>
                </div>
            </div>
            <div className="container">
                <section className="abt-head mt-5 py-2">
                    <h3 className="text-bold my-4"> # Some ways to contact with me #</h3>
                    <div className="row py-3">
                        <div className="col-md-3">
                            <div className="contact-card">
                                <a target="_blank" className="btn btn-cc" href="https://facebook.com/mahabub.mmm">
                                    <IoLogoFacebook /> Facebook
                                </a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="contact-card">
                                <a target="_blank" className="btn btn-cc" href="https://www.instagram.com/mahabub723405/">
                                    <IoLogoInstagram /> Instagram
                                </a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="contact-card">
                                <a target="_blank" className="btn btn-cc" href="https://github.com/mahabubdev">
                                    <IoLogoGithub /> Github
                                </a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="contact-card">
                                <a className="btn btn-cc" href="mailto:mdev.mycolors@gmail.com">
                                    <IoMdMail /> E-Mail
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ContactPage;