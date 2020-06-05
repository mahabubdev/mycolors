import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const DefaultLayout = (props) => {

    const auth = useSelector( state => (state.auth) ); // Auth State
    const authStatus = auth.isAuthenticated;


    // Auth check and redirect if not
    /*
    useEffect(() => {
        if (! authStatus) {
            if (props.children.props.location.pathname === '/login') {
                //console.log(props.children.props)
            }
        }
    }, []) */



    return (
        <div className="default-page">
            <div className="cred-header"></div>
            <div className="page-area">
                {
                    authStatus === true ? ( props.children.props.history.push('/dashboard') ) : ( props.children )
                }
            </div>
        </div>
    );
}

export default DefaultLayout;