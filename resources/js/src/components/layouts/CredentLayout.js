import React from "react";

const DefaultLayout = (props) => {
    return (
        <div className="default-page">
            <div className="cred-header"></div>
            <div className="page-area">
                { props.children }
            </div>
        </div>
    );
}

export default DefaultLayout;