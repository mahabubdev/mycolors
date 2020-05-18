import React from "react";

const DefaultLayout = (props) => {
    return (
        <div className="default-page">
            <div className="cred-header">
                <h2>Auth pages</h2>
            </div>
            <div className="page-area">
                { props.children }
            </div>
        </div>
    );
}

export default DefaultLayout;