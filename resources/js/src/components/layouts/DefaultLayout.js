import React from "react";
import Header from './../Header';

const DefaultLayout = (props) => {
    return (
        <div className="default-page">
            <Header />
            <div className="container">
                { props.children }
            </div>
        </div>
    );
}

export default DefaultLayout;