import React from "react";
import Header from './../Header';

const CredentialsLayout = (props) => {
    return (
        <div className="default-page">
            <Header />
            <div className="page-area">
                { props.children }
            </div>
        </div>
    );
}

export default CredentialsLayout;