import React from "react";
import checkAuth from './../../middleware/authenticationCheck';

const DashboardLayout = (props) => {
    //check Auth middleware
    checkAuth();


    return (
        <div className="dashboard-page">
            <h1>Header of Dashboard</h1>
            <div className="page-area">
                { props.children }
            </div>
        </div>
    );
}

export default DashboardLayout;