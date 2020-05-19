import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const DefaultLayout = (props) => {

    const auth = useSelector( state => (state.auth) ); // Auth State
    const authStatus = auth.isAuthenticated;

    // Auth check and redirect if not
    useEffect(() => {
        //console.log('Passed..')
        if (authStatus){
            //console.log('STAY')
            props.children.props.history.push('/dashboard')
        }
    }, [authStatus, auth, props])


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