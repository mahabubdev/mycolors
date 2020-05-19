import React, {useEffect} from "react";
import {Redirect} from 'react-router-dom';
import Header from './../Header';
import { useSelector } from "react-redux";

const DashboardLayout = (props) => {
    const auth = useSelector( state => (state.auth) ); // Auth State
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



export default DashboardLayout;