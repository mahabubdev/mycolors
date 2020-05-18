import React from "react";
import Header from './../Header';

const DefaultLayout = (props) => {
    return (
        <div className="default-page">
            <div className="dashboard-header">
                <h2>Dashboard Header</h2>
            </div>
            <div className="page-area">
                { props.children }
            </div>
        </div>
    );
}

export default DefaultLayout;