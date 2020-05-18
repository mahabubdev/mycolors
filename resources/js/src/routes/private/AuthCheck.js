import React, { useEffect, useCallback } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";



function AuthCheckRoute (props) {
    
    // Authentication check
    const auth = useSelector((state) => state.authReducer);

    console.log(auth);


    const AuthCheck = ({ component: Component, layout: Layout, ...rest }) => (

        <Route {...rest} render={ props => (
            auth.isAuthenticated === true ?
            (
            <Layout>
                <Component {...props}></Component>
            </Layout>
            ) : (
                <Redirect to='/login' />
            )
    
        )}/>
    );

    return <AuthCheck />

}




export default AuthCheckRoute;