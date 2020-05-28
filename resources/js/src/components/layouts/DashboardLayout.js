import React, {useEffect} from "react";
import { useSelector } from "react-redux";

import "../css/dashboard.css";
import Sidebar from './../pages/dashboard/Sidebar';
import DashHeader from "../pages/dashboard/DashHeader";

const DashboardLayout = (props) => {
    const auth = useSelector( state => (state.auth) ); // Auth State
    const theme = useSelector( state => (state.theme) ); // Auth State

    const authStatus = auth.isAuthenticated;



    // Auth check and redirect if not
    useEffect(() => {
        //console.log('Passed..')
        if (authStatus === false || authStatus === null){
            //console.log('STAY')
            props.children.props.history.push('/login')
        }
    }, [])

    return (
        <div className="dashboard-page">
            <div className="dashboard-wrapper" style={
                theme.sideExpanded ? theme.sidenav.expanded.mrDash : theme.sidenav.collapsed.mrDash
            }>
                <DashHeader />
                <Sidebar />
                <div className="dashboard-content pt-3">
                    <div className="container">
                        { props.children }
                    </div>
                </div>
            </div>
        </div>
    );
}



export default DashboardLayout;