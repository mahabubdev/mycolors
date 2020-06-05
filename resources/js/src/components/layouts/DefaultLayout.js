import React from "react";
import Header from './../Header';
import Footer from './../Footer';

const DefaultLayout = (props) => {
    return (
        <div className="default-page">
            <Header />
            <div className="page-wrapper">
                { props.children }
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;